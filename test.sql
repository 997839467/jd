/*
 Navicat Premium Data Transfer

 Source Server         : localhost-mysql
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 04/03/2020 03:53:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_admin
-- ----------------------------
DROP TABLE IF EXISTS `t_admin`;
CREATE TABLE `t_admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_admin
-- ----------------------------
INSERT INTO `t_admin` VALUES (1, '997839467', 'gzy585858');

-- ----------------------------
-- Table structure for t_leftcatalog
-- ----------------------------
DROP TABLE IF EXISTS `t_leftcatalog`;
CREATE TABLE `t_leftcatalog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `left_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_leftcatalog
-- ----------------------------
INSERT INTO `t_leftcatalog` VALUES (1, '果汁');
INSERT INTO `t_leftcatalog` VALUES (2, '奶茶');
INSERT INTO `t_leftcatalog` VALUES (3, '苏打');
INSERT INTO `t_leftcatalog` VALUES (4, '咖啡');
INSERT INTO `t_leftcatalog` VALUES (5, '沙冰');
INSERT INTO `t_leftcatalog` VALUES (6, '刨冰');
INSERT INTO `t_leftcatalog` VALUES (7, '鲜果茶');
INSERT INTO `t_leftcatalog` VALUES (8, '纯茶');
INSERT INTO `t_leftcatalog` VALUES (9, '奶昔');
INSERT INTO `t_leftcatalog` VALUES (10, '蛋糕甜点');
INSERT INTO `t_leftcatalog` VALUES (11, '特色小吃');

-- ----------------------------
-- Table structure for t_rightcatalog
-- ----------------------------
DROP TABLE IF EXISTS `t_rightcatalog`;
CREATE TABLE `t_rightcatalog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL,
  `img_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` decimal(10, 0) NOT NULL,
  `detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_rightcatalog
-- ----------------------------
INSERT INTO `t_rightcatalog` VALUES (1, 1, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (2, 1, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (3, 1, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (4, 1, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (5, 1, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (6, 1, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (7, 1, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (8, 1, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (9, 2, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (10, 2, 'http://img5.imgtn.bdimg.com/it/u=2913788396,1599774673&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (11, 2, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (12, 2, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (13, 2, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (14, 2, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (15, 2, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (16, 3, 'http://img1.imgtn.bdimg.com/it/u=2374026138,1664932963&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (17, 3, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (18, 3, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (19, 3, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (20, 4, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (21, 4, 'http://img2.imgtn.bdimg.com/it/u=1758109709,1977053283&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (22, 4, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (23, 4, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (24, 4, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (25, 5, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (26, 5, 'http://img3.imgtn.bdimg.com/it/u=4126666730,880135907&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (27, 5, 'http://img2.imgtn.bdimg.com/it/u=2168092907,2335505335&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (28, 5, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (29, 5, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (30, 6, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (31, 6, 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3348896149,2498430317&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (32, 6, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (33, 6, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (34, 6, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (35, 7, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (36, 7, 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1960853290,2798298748&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (37, 7, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (38, 7, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (39, 7, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (40, 7, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (41, 8, 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2941502379,2928244488&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (42, 8, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (43, 8, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (44, 8, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (45, 8, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (46, 9, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (47, 9, 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2935825771,4240158480&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (48, 9, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (49, 9, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (50, 10, 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3690293404,1647821531&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (51, 10, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (52, 10, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (53, 10, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (54, 10, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (55, 10, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (56, 11, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (57, 11, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (58, 11, 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=293245056,311696383&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (59, 11, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');
INSERT INTO `t_rightcatalog` VALUES (60, 11, 'http://img2.imgtn.bdimg.com/it/u=1374799773,2543460389&fm=26&gp=0.jpg', '烧仙草', 8, 'Q弹珍珠、甜糯绿豆、清爽仙草冻、甜蜜葡萄干、花生碎、香滑牛奶......经典口味，久盛不衰');

-- ----------------------------
-- Table structure for t_sites
-- ----------------------------
DROP TABLE IF EXISTS `t_sites`;
CREATE TABLE `t_sites`  (
  `sites_id` int(11) NOT NULL COMMENT '主键：座位id',
  `order_status` tinyint(1) NOT NULL COMMENT '座位状态',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '座位标题',
  PRIMARY KEY (`sites_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_sites
-- ----------------------------
INSERT INTO `t_sites` VALUES (1, 0, '座位1');
INSERT INTO `t_sites` VALUES (2, 0, '座位2');
INSERT INTO `t_sites` VALUES (3, 0, '座位3');
INSERT INTO `t_sites` VALUES (4, 0, '座位4');
INSERT INTO `t_sites` VALUES (5, 0, '座位5');
INSERT INTO `t_sites` VALUES (6, 0, '座位6');
INSERT INTO `t_sites` VALUES (7, 0, '座位7');
INSERT INTO `t_sites` VALUES (8, 0, '座位8');
INSERT INTO `t_sites` VALUES (9, 0, '座位9');
INSERT INTO `t_sites` VALUES (10, 0, '座位10');
INSERT INTO `t_sites` VALUES (11, 0, '座位11');
INSERT INTO `t_sites` VALUES (12, 0, '座位12');
INSERT INTO `t_sites` VALUES (13, 0, '座位13');
INSERT INTO `t_sites` VALUES (14, 0, '座位14');
INSERT INTO `t_sites` VALUES (15, 0, '座位15');
INSERT INTO `t_sites` VALUES (16, 0, '座位16');

-- ----------------------------
-- Table structure for t_sitesorder
-- ----------------------------
DROP TABLE IF EXISTS `t_sitesorder`;
CREATE TABLE `t_sitesorder`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uuid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订单号',
  `t_user_id` mediumint(8) NOT NULL COMMENT '用户id',
  `t_sites_id` int(11) NOT NULL COMMENT '座位id',
  `create_time` datetime(6) NOT NULL COMMENT '创建时间',
  `status` tinyint(1) NOT NULL COMMENT '订单状态--与座位状态通过mysql事件关联\r\n0：已完成\r\n1：使用中\r\n2：预约中\r\n3：10分钟到已取消',
  `endtime` datetime(6) NOT NULL COMMENT '结束时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 81 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `weixin_openid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '用户openid',
  `nickname` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户昵称',
  `gender` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户性别',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '用户头像',
  `register_time` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户注册时间',
  `last_login_time` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户最后登录时间',
  `last_login_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '用户最后登录ip',
  `register_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '用户注册ip',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (17, 'oXbz64kHgWRWsGPyKo_15A4sUq9Q', '继续。', 1, 'https://wx.qlogo.cn/mmopen/vi_32/5icHNmy3LXpX7ia8sCLLXryjq0MNlzNTV3zlUGtPtJSfEuAZPUBF5PUaicPQPoh4XJoEibEkHRvD63fUUicn4XfyiaAw/132', 1582614167, 1583242287, '::ffff:192.168.1.104', '::1');
INSERT INTO `t_user` VALUES (18, '', 'jack', 0, '', 0, 0, '', '');
INSERT INTO `t_user` VALUES (19, 'oXbz64hm6rMgFejNEfvQOgyq73Pg', '龚林', 1, 'https://wx.qlogo.cn/mmopen/vi_32/KMb93SbfHSKiaTnh3fX46fRDy7yLp3eSPCP9ayI8FsDx1L8bRKnqS0DcbOCiaicTusBGaIQL6KKCQpfS4UfhcYtgg/132', 1583064790, 1583064883, '::ffff:192.168.1.105', '::ffff:192.168.1.105');

-- ----------------------------
-- Event structure for delete_sitesorder_everyday
-- ----------------------------
DROP EVENT IF EXISTS `delete_sitesorder_everyday`;
delimiter ;;
CREATE EVENT `delete_sitesorder_everyday`
ON SCHEDULE
EVERY '1' DAY STARTS '2020-02-29 00:00:01'
COMMENT '这个是每天00:00:01的时候吧占座订单都删除\r\n但是delete *出问题，我只好把订单id<10000的都删除'
DO BEGIN
DELETE FROM t_sitesorder WHERE id<10000;
END
;;
delimiter ;

-- ----------------------------
-- Event structure for del_outtime
-- ----------------------------
DROP EVENT IF EXISTS `del_outtime`;
delimiter ;;
CREATE EVENT `del_outtime`
ON SCHEDULE
EVERY '10' SECOND STARTS '2020-02-24 20:33:09'
COMMENT '超过三小时的订单，会把订单status 0，1变成0，\r\n2，3变成3'
DO UPDATE t_sitesorder SET `status`= case when `status`=3 then 3  when `status`=2 then 3 else 0 end
WHERE TIMESTAMPDIFF(SECOND,create_time,NOW()) > 10800
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table t_sitesorder
-- ----------------------------
DROP TRIGGER IF EXISTS `tri_staus1`;
delimiter ;;
CREATE TRIGGER `tri_staus1` AFTER UPDATE ON `t_sitesorder` FOR EACH ROW BEGIN
IF new.status = 0 THEN
UPDATE t_sites SET order_status=0 WHERE sites_id=new.t_sites_id;
ELSEIF new.status = 1 THEN
UPDATE t_sites SET order_status=1 WHERE sites_id=new.t_sites_id;
ELSEIF new.status = 2 THEN
UPDATE t_sites SET order_status=2 WHERE sites_id=new.t_sites_id;
ELSEIF new.status = 3 THEN
UPDATE t_sites SET order_status=3 WHERE sites_id=new.t_sites_id;
END IF;

END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
