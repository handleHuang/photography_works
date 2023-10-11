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

 Date: 11/10/2023 17:35:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for collect
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `item_id` int NOT NULL,
  `author_id` int NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of collect
-- ----------------------------
INSERT INTO `collect` VALUES (7, 22, 3, NULL, '2023-09-28 10:50:25');
INSERT INTO `collect` VALUES (11, 22, 4, NULL, '2023-09-28 11:00:14');
INSERT INTO `collect` VALUES (25, 5, 13, NULL, '2023-10-11 16:17:01');
INSERT INTO `collect` VALUES (26, 5, 12, NULL, '2023-10-11 16:17:27');
INSERT INTO `collect` VALUES (27, 5, 14, NULL, '2023-10-11 16:18:26');
INSERT INTO `collect` VALUES (28, 5, 17, 5, '2023-10-11 17:14:25');

SET FOREIGN_KEY_CHECKS = 1;
