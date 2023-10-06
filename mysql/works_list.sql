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

 Date: 06/10/2023 17:03:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for works_list
-- ----------------------------
DROP TABLE IF EXISTS `works_list`;
CREATE TABLE `works_list`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '列表id',
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户name',
  `collect` int NOT NULL COMMENT '是否收藏1/0 已收藏/未收藏',
  `collect_number` int NOT NULL COMMENT '多少人收藏',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '封面图最多九张，mysql只存名称，前缀自己拼接',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '作品名称',
  `topic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '命题名字',
  `cont` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '描述',
  `state` int NOT NULL COMMENT '是否上架，1/0，已上架/未上架，只有上架了才能在前端展示',
  `beiyong1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备用',
  `beiyong2` int NULL DEFAULT NULL COMMENT '备用',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `process` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '控制手段',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of works_list
-- ----------------------------
INSERT INTO `works_list` VALUES (3, 'Kondo Mitsuki', 0, 212, '[\'shutterstock_553651330.jpg_1140x855.png\',\'shutterstock_553651330.jpg_1140x855.png\']', 'Miss.', 'tRHTmY8VJH', 'r1qEXgxj4S', 2, '[\"userimg.jpg\",\"testpic.png\"]', 0, '2023-10-06 17:01:54', NULL);
INSERT INTO `works_list` VALUES (4, 'Jack Rivera', 1, 482, '[\'shutterstock_553651330.jpg_1140x855.png\',\'shutterstock_553651330.jpg_1140x855.png\']', 'Mr.', 'dlMJ510v6y', 'FEm07hq7Ph', 1, '[\"userimg.jpg\",\"testpic.png\"]', 0, '2023-10-06 17:01:55', NULL);
INSERT INTO `works_list` VALUES (5, 'Michelle Smith', 1, 608, '[\'shutterstock_553651330.jpg_1140x855.png\',\'shutterstock_553651330.jpg_1140x855.png\']', 'Ms.', 'FKAWnsmoYD', '3SH0DvGDiW', 2, '[\"userimg.jpg\",\"testpic.png\"]', 0, '2023-10-06 17:01:57', NULL);
INSERT INTO `works_list` VALUES (6, 'Kong Lik Sun', 1, 702, '[\'shutterstock_553651330.jpg_1140x855.png\',\'shutterstock_553651330.jpg_1140x855.png\']', 'Miss.', 'EYSqHvjwzm', 'QykkleQqO5', 2, '[\"userimg.jpg\",\"testpic.png\"]', 0, '2023-10-06 17:01:58', NULL);
INSERT INTO `works_list` VALUES (7, 'Lu Zitao', 0, 790, '[\'shutterstock_553651330.jpg_1140x855.png\',\'shutterstock_553651330.jpg_1140x855.png\']', 'Prof.', 'fy0LVCaWAz', 'qI1AxWQhc8', 1, '[\"userimg.jpg\",\"testpic.png\"]', 0, '2023-10-06 17:01:59', NULL);
INSERT INTO `works_list` VALUES (8, 'Hui On Kay', 1, 424, '[\'shutterstock_553651330.jpg_1140x855.png\',\'shutterstock_553651330.jpg_1140x855.png\']', 'Miss.', 'xZbaDQ5WMG', '2dBYFiIPgL', 1, '[\"userimg.jpg\",\"testpic.png\"]', 0, '2023-10-06 17:01:59', NULL);
INSERT INTO `works_list` VALUES (9, 'Miura Momoe', 1, 61, '[\'shutterstock_553651330.jpg_1140x855.png\',\'shutterstock_553651330.jpg_1140x855.png\']', 'Mr.', 'rRuETRiBYF', 'LyHGKjjOhJ', 1, '[\"userimg.jpg\",\"testpic.png\"]', 0, '2023-10-06 17:02:00', NULL);
INSERT INTO `works_list` VALUES (10, 'Ying Yu Ling', 0, 602, '[\'shutterstock_553651330.jpg_1140x855.png\',\'shutterstock_553651330.jpg_1140x855.png\']', 'Miss.', '4FxUrE3xBS', 'GmvMn8iIHP', 2, '[\"userimg.jpg\",\"testpic.png\"]', 0, '2023-10-06 17:02:04', NULL);
INSERT INTO `works_list` VALUES (11, 'admin', 0, 0, '[\"ä¸è½½.jpg\",\"userimg.jpg\"]', 'qwe', 'qweqwe', 'qweqwe', 0, '[\"userimg.jpg\",\"testpic.png\"]', NULL, '2023-10-06 16:16:31', 'qweqwe');

SET FOREIGN_KEY_CHECKS = 1;
