var express = require('express')
var md5 = require('blueimp-md5')
const request = require('request')
const jwt = require('jsonwebtoken')
const secret = "SLDLKKDS323ssdd@#@@gf"
const WXBizDataCrypt = require('./public/js/WXBizDataCrypt')
const sha1 = require('sha1')
const moment = require('moment')
const getbase = require('./utils/svgencodeverify.js')

var router = express.Router()

const util = require('./utils/util.js')


// 登录
router.post('/login', async function(req, res) {
    const code = req.body.code;
    const fullUserInfo = req.body.userInfo;
    const clientIp = req.ip;
    const { errno, errmsg, data: userInfo } = await util.login(code, fullUserInfo);
    const registertime = parseInt(Date.now() / 1000)
    if (errno !== 0) {
        return res.json({ errno, errmsg });
    }


    //这里的数据库操作我通过上面的改造，也改造成了async同步了，而且这下面有两种方式实现数据库操作，一种是直接写在sql语句里，一种是把value写在后面那个参数里
    //为了方便，我用后面这种
    // // // 根据openid查找用户是否已经注册
    let rows = await util.selectAllData(`SELECT id FROM t_user WHERE  weixin_openid=?`, [userInfo.openId])
    // let rows = await selectAllData(`SELECT id FROM t_user where  weixin_openid='${userInfo.openId}'`)
    if (util.isEmpty(rows)) {
        // 注册
        rows = await util.selectAllData('INSERT INTO t_user SET ?', {
            weixin_openid: userInfo.openId,
            nickname: userInfo.nickName,
            avatar: userInfo.avatarUrl,
            gender: userInfo.gender,
            register_time: registertime,
            register_ip: clientIp
        })

        // rows = await selectAllData(`INSERT INTO t_user(weixin_openid,nickname,avatar,gender,register_time,register_ip) VALUES('${userInfo.openId}','${userInfo.nickName}','${userInfo.avatarUrl}','${userInfo.gender}','${registertime}','${clientIp}')`)
        rows = rows.insertId
    } else {
        rows = rows[0].id
    }
    console.log(rows)

    // 查询用户信息 我明白这里了，因为用户数据可能因为其他的设置更新过，所以查出来返回回去最新的用户数据
    let newUserInfo = await util.selectAllData('SELECT ?? FROM ?? WHERE id=?',
        [
            ['id', 'nickname', 'gender', 'avatar'], 't_user', rows
        ])
    //更新登录时间和ip
    await util.selectAllData('UPDATE t_user SET ? WHERE id=?',
        [{
            last_login_time: registertime,
            last_login_ip: clientIp
        }, rows])

    const sessionKey = jwt.sign(rows, secret)
    if (util.isEmpty(sessionKey)) {
        return res.json({ errno: 400, errmsg: '生成 token 失败' });
    }
    newUserInfo = Object.assign({}, newUserInfo[0])
    console.log(newUserInfo)
    // setTimeout(() => {
    return res.json({ errno: 0, token: sessionKey, userInfo: newUserInfo })
    // }, 1000)
})


//登录判断
//判断用户是否登录路由，没登录会返回客户端errno 400 userid：0
//登录了也是返回客户端 不过是errno 0 userid 就是用户id
router.get('/test', async function(req, res) {
    //每个私有请求前都有个这个函数
    await util._before(req, res)
})

//获取座位信息
router.get('/sites', async function(req, res) {
    const rows = await util.selectAllData('SELECT * FROM t_sites')
    const siteslists = JSON.parse(JSON.stringify(rows))
    return res.json(siteslists)
})

//占座
router.get('/occupysites', async function(req, res) {
    //进来先判断一下当前座位状态，因为有可能网速不好，别人已经占了，你还是点进来了，所以必须有这个保险
    //你想，两个用户我点占座1号后，页面会刷新，一号显示被占，但是2号这里没有切换刷新页面的话，status会仍然是0，
    //没有和最新的保持一致，，那么它一点击，这个座位也会被占，这就会出问题了，所以务必要有这个判断
    //占座时，判断当前座位status是否是1或者2，不管1或者2 都不让占座
    const statusnow = await util.selectAllData('SELECT order_status FROM t_sites WHERE sites_id=?', [req.query.sitesid])
    if (statusnow[0].order_status === 1 || statusnow[0].order_status === 2) {
        return res.json({ errno: 401, errmsg: "可能由于网络原因，你手慢了,该座位已被占" })
    }
    console.log(statusnow, statusnow[0].order_status)
    const checksites = await util.selectAllData('SELECT status FROM t_sitesorder WHERE  t_user_id=?', [req.query.userid])
    let sum = 0
    for (var i = 0; i < checksites.length; i++) {
        sum += checksites[i].status
    }
    console.log(sum, checksites)
    //哦哦哦，没事没事，这里判断的是他本人的呃订单状态，不是座位的状态，所以没关系
    //可以，如果取消，那么status会是3，那么它占不了座了，哈哈哈。。。本来0和3都是没占座位有点棘手
    //想不到现在还是这样判断还挺好，这样不经判断可以，而且还能让占座一次取消的人，不能再次占座，哈哈
    //对了，我还得弄个事件，每天24点吧座位状态全部调为0，然后删除所以订单数据，恩
    if (sum === 0) {
        const sitesuid = await util.uu()
        console.log(sitesuid)

        const time = Date.now()
        const createtime = new Date(time).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
        //这里本来是10800000加3小时成为endtime，但是预约时间和创建时间是一样的，所以这样的话可以保证时间是
        //大于3小时的，其实也可以用更新或者加一个预约时间来做，不够有点麻烦，等会做把，算了就这样吧，懒得做了
        const endtime = new Date(time + 10800000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
        console.log(req.query.userid, req.query.sitesid, createtime, endtime)
        const rows = await util.selectAllData('INSERT INTO t_sitesorder SET ?', {
            uuid: sitesuid,
            t_user_id: req.query.userid,
            t_sites_id: req.query.sitesid,
            create_time: createtime,
            endtime: endtime,
            status: 2
            // 座位status根据订单的status来变，不用担心有很多status怎么办，每次只会插入一个，按照新插入的为准，
            // 然后取消或者完成的订单会修改这个status，那么联动修改就行了，不对这样的话，那只能每次都
            // 立即联动修改sites表单的status了，不然触发器好像无法做到判断，因为用户订单我不删除了，这样就会重复，
            // 显然此时触发器无法满足需求了
            // 以为客户端判断了座位是否有人，而这里
            // 用num===0又判断了该用户是否有座位在使用，所以===0的话说明，他是之前的座位订单都完成了或者取消了
            // 然后如果用户再次点击，显然可以判断出num>0,那么说明用户已经占了座位了，有座位订单在进行中，那么提示
            // 用户已经占了一个座位
        })
        console.log("111111")
        await util.selectAllData('UPDATE t_sites SET ? WHERE sites_id=?',
            [{
                order_status: 2
            }, req.query.sitesid])
        let order = await util.selectAllData('SELECT * FROM t_sitesorder WHERE uuid=?', [sitesuid])
        // let sitesuser = await util.selectAllData('SELECT * FROM t_user WHERE id=?', [req.query.userid])
        // sitesuser = Object.assign({}, sitesuser[0])
        // console.log(rows, order, sitesuser,order,"kokodayou")
        result = JSON.parse(JSON.stringify(order))
        //这是个神器，数据库拿出来的时间总是带有t.000什么的字符，这个可以把它化为正常格式
        let ordertime = moment(result[0].create_time).format(
            'Y-MM-DD HH:mm:ss'
        );
        console.log(ordertime)
        // setTimeout(() => {
        return res.json({ errno: 0, errmsg: "占座成功,请在十分钟内赶来，否则占座取消", orderdetail: { ordertime, endtime, orderstatus: result[0].status, sitesuid: result[0].uuid } })
        // }, 2000)
    } else {
        return res.json({ errno: 401, errmsg: "你已经占了一个座位了，或者你因为之前占了一个座位没有及时赶到，所以今天无法再占座" })
    }





    // if (util.isEmpty(checksites)) {
    //     const time = Date.now()
    //     const createtime = new Date(time).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
    //     const endtime = new Date(time + 10800000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
    //     console.log(req.query.userid, req.query.sitesid, createtime, endtime)
    //     const rows = await util.selectAllData('INSERT INTO t_sitesorder SET ?', {
    //         t_user_id: req.query.userid,
    //         t_sites_id: req.query.sitesid,
    //         create_time: createtime,
    //         status:1
    //     })
    //     const order = await util.selectAllData('SELECT * FROM t_sitesorder WHERE t_user_id=?', [req.query.userid])
    //     console.log(rows, order)
    //     result = JSON.parse(JSON.stringify(order))
    //     let ordertime = moment(result[0].create_time).format(
    //         'Y-MM-DD HH:mm:ss'
    //     );
    //     console.log(ordertime)
    //     // setTimeout(() => {
    //         return res.json({ errno: 0, errmsg: "占座成功", rows: ordertime,})
    //     // }, 2000)
    // } else {
    //     return res.json({ errno: 401, errmsg: "你已经占了一个座位了" })
    // }

})

//管理员确认用户10分钟到达
router.get('/sureoccupysites', async function(req, res) {
    let result = await util.selectAllData('SELECT status FROM t_sitesorder WHERE uuid=?',
        [req.query.id])
    if (true) {
        await util.selectAllData('UPDATE t_sitesorder SET ? WHERE uuid=?',
            [{
                status: 1
            }, req.query.id])
        return res.json({ errno: 0 })
    } else {
        //这种情况一般出现在可能其他管理员几秒前已经处理了，而您又刚好没刷新，所以你还有处理的按钮
        //但是这样会造成把前面的操作覆盖掉造成混乱，所以先判断该订单状态是不是2，2代表预约中，且没被任何人处理过，
        //因为预约只有管理员和页面10分钟刷新判断的接口能处理，而如果仍然是2，表示还没被处理呢，你可以处理，
        //这个判断要在管理员界面的确认和取消操作之前都要加上
        return res.json({ errno: 0, errmsg: "该订单状态已经不是2了" })
    }

})

//用户订单界面和主页座位界面也用了这个，挺好用的，因为它算是一个及时更新吧，去除黄色的座位
//将用户以及管理员界面中的预约中的状态的订单改为已取消，当然了，是超过10分钟的
//管理员界面每次show先判断所有的订单是否有已经10分钟失效的了
//当前时间和创建时间相比，如果有自动把订单状态改成已取消，这种就不用自己判断的
//管理员确实是有确定和取消两个按钮，用于10分钟的，但是都是10分钟内来解决问题的，
//超过了，订单状态会变成已取消，这两个按钮也会消失，10分钟内的话，确定可以用于确定到达
//取消可以用户，假如用户打电话提前取消了，就这样的
router.get('/autosureordertime', async function(req, res) {
    let timenow = Date.now()
    let timecreate = await util.selectAllData('SELECT * FROM t_sitesorder')
    timecreate = JSON.parse(JSON.stringify(timecreate))
    // if (char >= 10) {
    //     await util.selectAllData('UPDATE t_sitesorder SET ? WHERE uuid=?')

    for (var i = 0; i < timecreate.length; i++) {
        let ordertime = moment(timecreate[i].create_time).format(
            'Y-MM-DD HH:mm:ss'
        )
        let oldtime = ordertime.replace(new RegExp("-", "gm"), "/")
        let newtime = (new Date(oldtime)).getTime()
        let char = parseInt(parseInt((timenow - newtime) / 1000) / 60)
        if (char >= 10 && timecreate[i].status === 2) {
            console.log('执行了吗')
            await util.selectAllData('UPDATE t_sitesorder SET ? WHERE uuid=?', [{ status: 3 }, timecreate[i].uuid])
        }
    }
    //     // return res.json({ errmsg:'我不知道改了多少10分钟外的订单status为3了' })
    // } else {
    // return res.json({errmsg:'没有一个10分钟外的订单需要我改'})
    // }
    return res.json({ errno: 0 })
    // console.log(timenow, timecreate, oldtime, newtime, char)
})

//10分钟内未到，管理员取消用户占座，将status改为3，该用户今天无法再占座，因为
//占座条件是用户所有订单status相加的总和要等于0，而它这样的话有个订单会等于3
//那么就会无法再占座
//也只有预约中管理员才会有两个按钮，其他三个状态都没有按钮，无法操作
router.get('/cancelorder', async function(req, res) {
    let result = await util.selectAllData('SELECT status FROM t_sitesorder WHERE uuid=?',
        [req.query.id])
    if (result[0].status === 2) {
        await util.selectAllData('UPDATE t_sitesorder SET ? WHERE uuid=?',
            [{
                status: 3
            }, req.query.id])
        return res.json({ errno: 0 })
    } else {
        //这种情况一般出现在可能其他管理员几秒前已经处理了，而您又刚好没刷新，所以你还有处理的按钮
        //但是这样会造成把前面的操作覆盖掉造成混乱，所以先判断该订单状态是不是2，2代表预约中，且没被任何人处理过，
        //因为预约只有管理员和页面10分钟刷新判断的接口能处理，而如果仍然是2，表示还没被处理呢，你可以处理，
        //这个判断要在管理员界面的确认和取消操作之前都要加上
        return res.json({ errno: 0, errmsg: "该订单状态已经不是2了" })
    }


})

//使用中用户自己取消使用，我离开了按钮也只会在使用中状态出现，使用户唯一可以操作的按钮，
//其他三个状态都没有按钮，无法操作
router.get('/usercancelarrive', async function(req, res) {
    await util.selectAllData('UPDATE t_sitesorder SET ? WHERE uuid=?',
        [{
            status: 0
        }, req.query.id])
    return res.json({ errno: 0 })

})

//管理员登录
router.get('/adminlogin', async function(req, res) {
    let loginErrorCount = Number(req.query.loginErrorCount) + 1
    console.log(loginErrorCount)
    let admin = await util.selectAllData('SELECT * FROM t_admin WHERE username=?', [req.query.username])
    admin = JSON.parse(JSON.stringify(admin))
    console.log(admin)

    //判断用户名是否存在
    if (util.isEmpty(admin)) {
        if (loginErrorCount >= 3) {
            let imgcode = await util.getCaptcha(res)
            let imgBase64 = `data:image/svg+xml;base64,${getbase.encode(imgcode.svgcode)}`
            // console.log(imgcode.textcode, imgcode.svgcode, imgBase64)
            console.log(req.query.code, req.query.codetext)
            if (req.query.code === req.query.codetext) {
                console.log("说明验证码正确但注意此时还是用户名不存在，此处你进来了只能说明你的用户名就不存在，所以全部都return就行了")
                return res.json({ errno: 400, errmsg: '用户名不存在', imgBase64, imgtext: imgcode.textcode })
            } else {
                return res.json({ errno: 400, errmsg: '验证码错误', imgBase64, imgtext: imgcode.textcode })
            }
        }
        // console.log(code)
        return res.json({ errno: 400, errmsg: '用户名不存在' })
    }

    //判断密码是否正确，能走到这里说明用户名肯定是对的
    if (req.query.password !== admin[0].password) {
        if (loginErrorCount >= 3) {
            let imgcode = await util.getCaptcha(res)
            let imgBase64 = `data:image/svg+xml;base64,${getbase.encode(imgcode.svgcode)}`
            // console.log(imgcode.textcode, imgcode.svgcode, imgBase64)
            console.log(req.query.code, req.query.codetext)
            if (req.query.code === req.query.codetext) {
                console.log("验证成功，验证码对了，但是进来这里就说明密码肯定不对，都return就行了，密码对了就不会进来")
                return res.json({ errno: 400, errmsg: '密码不正确', imgBase64, imgtext: imgcode.textcode })
            } else if (loginErrorCount === 3) {
                return res.json({ errno: 400, errmsg: '验证码发送了', imgBase64, imgtext: imgcode.textcode })
            } else {
                return res.json({ errno: 400, errmsg: '验证码错误', imgBase64, imgtext: imgcode.textcode })
            }
        }
        return res.json({ errno: 400, errmsg: '密码不正确' })
    } else {
        if (loginErrorCount >= 3) {
            if (req.query.code !== req.query.codetext) {
                let imgcode = await util.getCaptcha(res)
                let imgBase64 = `data:image/svg+xml;base64,${getbase.encode(imgcode.svgcode)}`
                return res.json({ errno: 400, errmsg: '验证码错误', imgBase64, imgtext: imgcode.textcode })
            }
        }
    }


    const sessionKey = jwt.sign(req.query.username, secret)
    if (util.isEmpty(sessionKey)) {
        return res.json({ errno: 400, errmsg: '生成 token 失败' });
    }
    return res.json({ errno: 0, token1: sessionKey })
})

router.get('/shit', function(req, res) {
    res.json({ a: "我过来了了" })
})





//获取占座订单信息 首页和管理员页面用
router.get('/getorders', async function(req, res) {
    let result = await util.selectAllData('SELECT * FROM t_sitesorder')
    result = JSON.parse(JSON.stringify(result))
    console.log(result)
    for (let i = 0; i < result.length; i++) {
        let username = await util.selectAllData('SELECT nickname FROM t_user WHERE id=?', [result[i].t_user_id])
        username = JSON.parse(JSON.stringify(username))
        console.log(username)
        result[i].create_time = moment(result[i].create_time).format(
            'Y-MM-DD HH:mm:ss'
        );
        result[i].endtime = moment(result[i].endtime).format(
            'Y-MM-DD HH:mm:ss'
        );
        result[i].username = username[0].nickname
    }
    return res.json({ result })
})

//获取用户自己占座订单  用户订单页面用
router.get('/getmyorders', async function(req, res) {
    let result = await util.selectAllData('SELECT * FROM t_sitesorder WHERE t_user_id=?', [req.query.userid])
    result = JSON.parse(JSON.stringify(result))
    console.log(result)
    for (let i = 0; i < result.length; i++) {
        let username = await util.selectAllData('SELECT nickname FROM t_user WHERE id=?', [result[i].t_user_id])
        username = JSON.parse(JSON.stringify(username))
        console.log(username)
        result[i].create_time = moment(result[i].create_time).format(
            'Y-MM-DD HH:mm:ss'
        );
        result[i].endtime = moment(result[i].endtime).format(
            'Y-MM-DD HH:mm:ss'
        );
        result[i].username = username[0].nickname
    }
    return res.json({ result })
})


//获取左侧分类信息，与当前左侧别选中的对应右侧饮品信息
router.get('/leftmenu', async function(req, res) {
    console.log(req.query.currentId)
    let result1 = await util.selectAllData('SELECT * FROM t_rightcatalog WHERE parent_id=?',[req.query.currentId])
   let result = await util.selectAllData('SELECT * FROM t_leftcatalog')
   result = JSON.parse(JSON.stringify(result))
   result1 = JSON.parse(JSON.stringify(result1))
   // console.log(result1)
   // console.log(result)
   return res.json({typeList:result, goodsList:result1})
})


//
router.get('/detail', async function(req, res) {
    let result = await util.selectAllData('SELECT * FROM t_rightcatalog WHERE id=?',[req.query.id])
    result = JSON.parse(JSON.stringify(result))
    console.log(result)
    return res.json({detail:result})
})


router.get('/submenulist', (req, res) => {
    res.send({
        "submenuList": [{
                img: "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1084701705,555599398&fm=26&gp=0.jpg",
                id: 10001,
                title: '卡布奇诺'
            },
            {
                img: "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1084701705,555599398&fm=26&gp=0.jpg",
                id: 10002,
                title: '柠檬苏打'
            },
            {
                img: "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1084701705,555599398&fm=26&gp=0.jpg",
                id: 10003,
                title: '毒药'
            },
            {
                img: "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1084701705,555599398&fm=26&gp=0.jpg",
                id: 10004,
                title: '解药'
            },
            {
                img: "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1084701705,555599398&fm=26&gp=0.jpg",
                id: 10005,
                title: '栏杆苏打'
            }
        ]
    })
})

router.get('/thirdgoodslist', (req, res) => {
    res.send({
        "goodsList": [{
                img: "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1084701705,555599398&fm=26&gp=0.jpg",
                id: 10001,
                title: '卡布奇诺',
                price: "9元起"
            },
            {
                img: "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1084701705,555599398&fm=26&gp=0.jpg",
                id: 10002,
                title: '柠檬苏打',
                price: "9元起"
            },
            {
                img: "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1084701705,555599398&fm=26&gp=0.jpg",
                id: 10003,
                title: '毒药',
                price: "9元起"
            },
            {
                img: "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1084701705,555599398&fm=26&gp=0.jpg",
                id: 10004,
                title: '解药',
                price: "9元起"
            },
            {
                img: "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1084701705,555599398&fm=26&gp=0.jpg",
                id: 10005,
                title: '栏杆苏打',
                price: "9元起"
            }
        ]
    })
})

//我属实是个nt 他妈的count写成了conut还在那儿找了半天错误
router.post('/loginn', (req, res) => {
    conn.query(`SELECT * FROM t_user where tel='${req.body.tel}' and 
        password='${req.body.password}'`, (err, data) => {
        if (err) {
            return res.json(err)
        }
        res.json(data)
    })
    //  conn.query(`SELECT * FROM t_user`,(err, data)=>{
    //     if (err){ return res.json(err)}
    //     res.json(data)
    // } )
})
router.get('/loginn', (req, res) => {
    res.render('loginn.html')
    // conn.query(`SELECT CONUT(*) FROM t_user where tel='${req.query.tel}' and 
    //     password='${req.query.password}'`,(err, data)=>{
    //         if (err){ return res.json(err)}
    //         res.json(data)
    //     } )
})


router.post('/userinfo', (req, res) => {
    conn.query(`SELECT * FROM t_user where id = '${req.body.id}'`,
        (err, data) => {
            if (err) {
                console.log(err)
                return res.json({
                    success: false
                })
            }
            res.json({
                success: true,
                data: data[0]
            })
        })
})
router.get('/userinfo', (req, res) => {
    res.render('detail.html')

})

router.get('/getopenid', (req, res) => {
    request({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            qs: {
                appid: 'wx123e2231462fadc9',
                secret: "046a41c65b1f54f0ebcde1fdec438766",
                js_code: req.query.code,
                grant_type: 'authorization_code'
            }
        },
        (err, response, body) => {
            if (err) return res.json(err)
            res.json(JSON.parse(body))
        })
})



module.exports = router

// 为了秀，我把function全改成了=>的写法。。。
// 这个写法是es6的最新写法吗
// es6的语法箭头函数 http://es6.ruanyifeng.com/#docs/function