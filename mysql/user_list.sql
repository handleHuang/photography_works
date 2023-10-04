/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80034
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80034
 File Encoding         : 65001

 Date: 04/10/2023 18:02:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_list
-- ----------------------------
DROP TABLE IF EXISTS `user_list`;
CREATE TABLE `user_list`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `identity` int NULL DEFAULT NULL,
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_list
-- ----------------------------
INSERT INTO `user_list` VALUES (2, 'cesces', 'anemdCes', 'anemdCes', 1, NULL);
INSERT INTO `user_list` VALUES (3, 'cesces11', 'zxczxc', '123123', 2, NULL);
INSERT INTO `user_list` VALUES (5, 'admin', '123123', '123123', 0, NULL);
INSERT INTO `user_list` VALUES (6, 'ceszhuce', '123123', '123123', 2, NULL);
INSERT INTO `user_list` VALUES (7, 'cesfanye', '123123', '123123', 2, NULL);
INSERT INTO `user_list` VALUES (8, 'cesfanye1', 'qweqwe', 'qweqwe', 2, NULL);
INSERT INTO `user_list` VALUES (10, 'cesanemd', 'qweqwe', 'qweqwe', 2, NULL);
INSERT INTO `user_list` VALUES (11, 'ceshizhuce', '123123', '123123', 2, NULL);
INSERT INTO `user_list` VALUES (19, 'zxc', 'admin', '123123', 0, NULL);
INSERT INTO `user_list` VALUES (20, 'zxcasd', '123123', '123123', 2, NULL);
INSERT INTO `user_list` VALUES (26, 'ces123123', '123123', '123123', 1, 'http://127.0.0.1:12134/user/ä¸è½½.jpg');

SET FOREIGN_KEY_CHECKS = 1;
