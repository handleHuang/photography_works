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

 Date: 27/09/2023 16:46:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for classify
-- ----------------------------
DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '命题id',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标题',
  `cont` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '描述',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '封面',
  `online` int NOT NULL COMMENT '是否上线',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classify
-- ----------------------------
INSERT INTO `classify` VALUES (2, 'qweqwe', 'qweqwe', 'http://127.0.0.1:12134/upload/shutterstock_553651330.jpg_1140x855.png', 1);
INSERT INTO `classify` VALUES (4, 'ces', 'ces', 'http://127.0.0.1:12134/upload/shutterstock_553651330.jpg_1140x855.png', 1);
INSERT INTO `classify` VALUES (5, '123', '23', 'http://127.0.0.1:12134/upload/testpic.png', 1);
INSERT INTO `classify` VALUES (6, '123123', '123123', 'http://127.0.0.1:12134/upload/9588.jpg_wh300.png', 1);
INSERT INTO `classify` VALUES (7, '123123', '123123', 'http://127.0.0.1:12134/upload/9588.jpg_wh300.png', 1);

SET FOREIGN_KEY_CHECKS = 1;
