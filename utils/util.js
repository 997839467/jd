let mysql = require('mysql')
const rpn = require('request-promise-native')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const svgCaptcha = require('svg-captcha')
const config = require('./config.js')

const appId = config.appId
const appSecret = config.appSecret
const secret = "SLDLKKDS323ssdd@#@@gf"


//封装时间转化函数
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}


// 封装判断是否为空

function isEmpty(val) {
    // null or undefined
    if (val == null) return true;

    if (typeof val === 'boolean') return false;

    if (typeof val === 'number') return !val;

    if (val instanceof Error) return val.message === '';

    switch (Object.prototype.toString.call(val)) {
        // String or Array
        case '[object String]':
        case '[object Array]':
            return !val.length;

            // Map or Set or File
        case '[object File]':
        case '[object Map]':
        case '[object Set]':
            {
                return !val.size;
            }
            // Plain Object
        case '[object Object]':
            {
                return !Object.keys(val).length;
            }
    }

    return false;
}



//封装数据库操作

let pool = mysql.createPool({
    host: 'localhost',
    prot: "3306",
    user: 'root',
    password: 'gzy585858',
    database: 'test'
})


let query = function(sql, values) {
    // 返回一个 Promise
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    // 结束会话
                    connection.release()
                })
            }
        })
    })
}


async function selectAllData(sql, values) {
    // let sql = 'SELECT * FROM my_table'
    let dataList = await query(sql, values)
    return dataList
}



//封装生成signature方法，传递参数为rawdata和session_key拼接的字符串
//我有点知道这个signature的意义了，就是我授权之后登录就绝对不会出错，会是一样的
//但是授权后的，后续退出登录了，再次登录就会先会不一样，然后再更新一样，用来保证用户数据的实时性，就这样吧，虽然还不时太清楚
function encodeUTF8(s) {
    var i, r = [],
        c, x;
    for (i = 0; i < s.length; i++)
        if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
        else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
    else {
        if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
            c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
            r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
        else r.push(0xE0 + (c >> 12 & 0xF));
        r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
    };
    return r;
};

// 字符串加密成 hex 字符串
function sha11(s) {
    var data = new Uint8Array(encodeUTF8(s))
    var i, j, t;
    var l = ((data.length + 8) >>> 6 << 4) + 16,
        s = new Uint8Array(l << 2);
    s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
    for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2);
    s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
    s[l - 1] = data.length << 3;
    var w = [],
        f = [
            function() { return m[1] & m[2] | ~m[1] & m[3]; },
            function() { return m[1] ^ m[2] ^ m[3]; },
            function() { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
            function() { return m[1] ^ m[2] ^ m[3]; }
        ],
        rol = function(n, c) { return n << c | n >>> (32 - c); },
        k = [1518500249, 1859775393, -1894007588, -899497514],
        m = [1732584193, -271733879, null, null, -1009589776];
    m[2] = ~m[0], m[3] = ~m[1];
    for (i = 0; i < s.length; i += 16) {
        var o = m.slice(0);
        for (j = 0; j < 80; j++)
            w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
            t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
            m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
        for (j = 0; j < 5; j++) m[j] = m[j] + o[j] | 0;
    };
    t = new DataView(new Uint32Array(m).buffer);
    for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2);

    var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function(e) {
        return (e < 16 ? "0" : "") + e.toString(16);
    }).join("");

    return hex;
};

//封装解析用户敏感及所有数据方法，传递参数为session_key encrypteddata,iv
async function decryptUserInfoData(sessionKey, encryptedData, iv) {
    let decoded = '';
    try {
        const _sessionKey = Buffer.from(sessionKey, 'base64');
        encryptedData = Buffer.from(encryptedData, 'base64');
        iv = Buffer.from(iv, 'base64');
        // 解密
        const decipher = crypto.createDecipheriv('aes-128-cbc', _sessionKey, iv);
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true);
        decoded = decipher.update(encryptedData, 'binary', 'utf8');
        decoded += decipher.final('utf8');
        const userInfo = JSON.parse(decoded);
        if (userInfo.watermark.appid !== appId) {
            return { errno: 400, errmsg: 'watermark appid 错误', data: null };
        }

        // 解析后的数据格式
        // { openId: 'oILjs0JEDIZzaWVc_sJW2k3fhp1k',
        //   nickName: '明天',
        //   gender: 1,
        //   language: 'zh_CN',
        //   city: 'Shenzhen',
        //   province: 'Guangdong',
        //   country: 'China',
        //   avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/9Otwibfa5VXR0ntXdlX84dibbulWLJ0EiacHeAfT1ShG2A7LQa2unfbZVohsWQlmXbwQGM6NnhGFWicY5icdxFVdpLQ/132',
        //   watermark: { timestamp: 1542639764, appid: 'wx262f4ac3b1c477dd' } }
        return { errno: 0, errmsg: '', data: userInfo };
    } catch (err) {
        return { errno: 500, errmsg: '解析用户数据错误：' + err.message, data: null };
    }
}

//封装处理login函数，主要操作有，获取session_key,openid，验证signature，解析用户敏感数据
async function login(code, fullUserInfo) {
    try {
        let options = {
            method: 'GET',
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            qs: {
                grant_type: 'authorization_code',
                js_code: code,
                secret: appSecret,
                appid: appId
            }
        };
        let sessionData = await rpn(options);
        sessionData = JSON.parse(sessionData); //此处获得openid和session_key
        // console.log(sessionData);
        if (!sessionData.openid) {
            return { errno: sessionData.errcode, errmsg: sessionData.errmsg, data: null };
        }

        // 验证用户信息完整性  此处验证signature
        const sha1 = sha11(fullUserInfo.rawData.toString() + sessionData.session_key)
        console.log("11111111")
        // console.log("我人呢")
        if (fullUserInfo.signature !== sha1) {
            return { errno: 400, errmsg: `signature 校验不一致`, data: null };
        }
        console.log("1111")
        // // 解析用户数据
        const wechatUserInfo = await decryptUserInfoData(sessionData.session_key, fullUserInfo.encryptedData, fullUserInfo.iv);
        console.log(wechatUserInfo)
        return wechatUserInfo;
    } catch (e) {
        return { errno: 400, errmsg: '微信登录失败：' + e.message, data: null };
    }

}

//以及其token解密的封装
async function verify(token, secret) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.log("不会吧")
                reject(err)
            } else {
                resolve(decoded)
            }

        })
    })

}

async function parse(token, secret) { //这里就是它的token解密
    console.log("我在3")
    if (token) {
        try {
            return await verify(token, secret);
        } catch (err) {
            return null;
        }
    }
    return null;
}


async function getUserId(token) {
    console.log(token, "token为空吗")
    console.log("我在1")
    console.log("我getuserid是第几个执行的")
    if (!token) {
        return { errno: 401, userId: 0, errmsg: 'token不存在' };
    }


    const result = await parse(token, secret); // 这里就进行了token解密得到userid了
    if (isEmpty(result) || result <= 0) {
        return { errno: 401, userId: 0, errmsg: '解密token获得的userid为空或者小于等于0' };
    }

    return { errno: 0, userId: result, errmsg: null };
}

// 封装处理私有请求函数的token判断
async function _before(req, res) {
    console.log(req.get("X-Nideshop-Token"))
    // 根据token值获取用户id
    token = req.get("X-Nideshop-Token") || '';
    const { errno, userId, errmsg } = Object.assign({}, await getUserId(token))
    console.log(userId)
    if (userId <= 0) {
        return res.json({ errno: 401, userId, errmsg: 'userid小于等于0' })
    }
    return res.json({ errno, userId, errmsg })
}

//用uuid生成唯一占座订单编号
async function uu() {
    return uuid.v1()
}



//封装管理员登录界面3次错误后验证码接口
async function getCaptcha(res) {
    //验证码颜色等格式
    let captcha = svgCaptcha.create({
        // 翻转颜色 
        inverse: false,
        // 字体大小 
        fontSize: 36,
        // 噪声线条数 
        noise: 2,
        // 宽度 
        width: 80,
        // 高度 
        height: 30,
    })
    //生成的验证码
    let textcode = captcha.text.toLowerCase()
    let svgcode = captcha.data
    return {textcode,svgcode}
}



module.exports = {
    isEmpty,
    selectAllData,
    login,
    _before,
    formatTime,
    uu,
    getCaptcha
}