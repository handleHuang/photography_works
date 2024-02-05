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

 Date: 28/12/2023 16:25:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '评论内容',
  `level` int NOT NULL COMMENT '评论层级，分三层，0为针对博文的评论，1为针对0的评论，2为针对1的评论',
  `parent_id` int NULL DEFAULT NULL COMMENT '回复的评论id，没有为0',
  `blog_id` int NOT NULL COMMENT '作品id',
  `user_id` int NOT NULL COMMENT '发表评论的用户id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '评论创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, '测试评论', 1, 0, 15, 5, '2023-12-27 11:34:04');
INSERT INTO `comment` VALUES (2, '测试评论2', 1, 0, 15, 5, '2023-12-27 11:35:13');
INSERT INTO `comment` VALUES (3, '测试评论', 1, 0, 15, 5, '2023-12-27 14:27:21');
INSERT INTO `comment` VALUES (4, '测试回复', 1, 0, 15, 5, '2023-12-27 15:17:16');
INSERT INTO `comment` VALUES (5, '测试回复', 2, 1, 15, 5, '2023-12-27 15:32:47');
INSERT INTO `comment` VALUES (6, '测试回复111', 2, 1, 15, 5, '2023-12-27 16:30:00');
INSERT INTO `comment` VALUES (7, '测试子回复', 3, 5, 15, 5, '2023-12-27 16:31:01');
INSERT INTO `comment` VALUES (8, '测试回复1234', 3, 5, 15, 5, '2023-12-27 16:58:45');
INSERT INTO `comment` VALUES (9, '测试回复12313123', 3, 8, 15, 19, '2023-12-27 18:04:24');
INSERT INTO `comment` VALUES (10, 'ces123', 3, 8, 15, 19, '2023-12-28 10:02:12');
INSERT INTO `comment` VALUES (11, 'ces123123', 3, 8, 15, 26, '2023-12-28 10:06:21');
INSERT INTO `comment` VALUES (12, '测试问问', 3, 5, 15, 26, '2023-12-28 11:34:36');
INSERT INTO `comment` VALUES (13, '测试时', 3, 12, 15, 26, '2023-12-28 11:34:48');

SET FOREIGN_KEY_CHECKS = 1;
