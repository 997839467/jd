appId = 'wx123e2231462fadc9'
appSecret = '046a41c65b1f54f0ebcde1fdec438766'
// 封装一个函数用来判断session是否过期，
// 		没过期就解密出数据，
// 		过期了，就首先判断该用户数据库中是否有openid记录，
// 				有的话，就跳过，直接生成新的session，
// 				没有的话，就先插入用户数据进去，然后生成新的sesion
			
module.exports = {
	appId,
	appSecret
}