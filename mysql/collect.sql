/*
 Navicat Premium Data Transfer

 Source Server         : ces
 Source Server Type    : MySQL
 Source Server Version : 80034
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80034
 File Encoding         : 65001

 Date: 29/02/2024 16:10:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for collect
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '收藏id',
  `user_id` int NOT NULL COMMENT '用户id',
  `item_id` int NOT NULL COMMENT '作品id',
  `author_id` int NULL DEFAULT NULL COMMENT '作者id',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '收藏时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of collect
-- ----------------------------
INSERT INTO `collect` VALUES (7, 22, 3, NULL, '2023-09-28 10:50:25');
INSERT INTO `collect` VALUES (11, 22, 4, NULL, '2023-09-28 11:00:14');
INSERT INTO `collect` VALUES (25, 5, 13, NULL, '2023-10-11 16:17:01');
INSERT INTO `collect` VALUES (26, 5, 12, NULL, '2023-10-11 16:17:27');
INSERT INTO `collect` VALUES (29, 5, 15, 5, '2023-10-12 17:05:54');

SET FOREIGN_KEY_CHECKS = 1;
