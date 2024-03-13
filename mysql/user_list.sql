/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 13/03/2024 23:39:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_list
-- ----------------------------
DROP TABLE IF EXISTS `user_list`;
CREATE TABLE `user_list`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户账号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户密码',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '邮箱',
  `identity` int(0) NULL DEFAULT NULL COMMENT '身份类型：0/1/2   超级管理员/管理员/普通用户',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `like_number` int(0) NOT NULL COMMENT '多少人收藏',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_list
-- ----------------------------
INSERT INTO `user_list` VALUES (2, 'cesces', 'anemdCes', 'anemdCes', 1, 'http://127.0.0.1:12134/user/9588.jpg_wh300.png', 0);
INSERT INTO `user_list` VALUES (3, 'cesces11', 'zxczxc', '123123', 2, NULL, 0);
INSERT INTO `user_list` VALUES (5, 'admin', '123123', '123123', 0, 'http://127.0.0.1:12134/user/dipsad.jpg', 4);
INSERT INTO `user_list` VALUES (6, 'ceszhuce', '123123', '123123', 2, NULL, 0);
INSERT INTO `user_list` VALUES (7, 'cesfanye', '123123', '123123', 2, NULL, 0);
INSERT INTO `user_list` VALUES (8, 'cesfanye1', 'qweqwe', 'qweqwe', 2, NULL, 0);
INSERT INTO `user_list` VALUES (10, 'cesanemd', 'qweqwe', 'qweqwe', 2, NULL, 0);
INSERT INTO `user_list` VALUES (11, 'ceshizhuce', '123123', '123123', 2, NULL, 0);
INSERT INTO `user_list` VALUES (19, 'zxc', 'admin', '123123', 0, NULL, 0);
INSERT INTO `user_list` VALUES (26, 'ces123123', '123123', '123123', 1, 'http://127.0.0.1:12134/user/ä¸è½½.jpg', 2);
INSERT INTO `user_list` VALUES (27, 'hon', '123123', '123123', 2, 'http://127.0.0.1:12134/user/asdf.jpg', 0);
INSERT INTO `user_list` VALUES (28, 'ceshon', '123123', '123123', 2, 'http://127.0.0.1:12134/user/asdf.jpg', 0);

SET FOREIGN_KEY_CHECKS = 1;
