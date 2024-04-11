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

 Date: 11/04/2024 17:39:21
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
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of classify
-- ----------------------------
INSERT INTO `classify` VALUES (8, '人像', '记录身边的人', 'http://127.0.0.1:12134/upload/5.JPG', 1);
INSERT INTO `classify` VALUES (9, '风景', '分享你眼中的世界', 'http://127.0.0.1:12134/upload/ (1).JPG', 1);
INSERT INTO `classify` VALUES (10, '街景', '扫街', 'http://127.0.0.1:12134/upload/ (8).JPG', 1);
INSERT INTO `classify` VALUES (11, '纪实', '捕捉最真实的画面', 'http://127.0.0.1:12134/upload/8.JPG', 1);

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
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of collect
-- ----------------------------
INSERT INTO `collect` VALUES (25, 5, 13, NULL, '2023-10-11 16:17:01');
INSERT INTO `collect` VALUES (30, 5, 21, 5, '2024-03-23 23:10:21');

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
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

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

-- ----------------------------
-- Table structure for competition
-- ----------------------------
DROP TABLE IF EXISTS `competition`;
CREATE TABLE `competition`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '赛事id',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cont` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cont2` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `online` int NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of competition
-- ----------------------------
INSERT INTO `competition` VALUES (5, 'http://127.0.0.1:12134/upload/1.jpg', '春季的美丽与生机', '活动时间： 2024年3月1日 - 2024年4月30日<br />\n\n活动简介： 春季是大自然苏醒的季节，万物复苏，生机勃发。本次比赛旨在通过摄影作品展现春季的美丽景色、生动画面和独特魅力，让摄影师们用镜头记录下春天的一瞬间，展示春季独特的魅力和生命力。<br />\n\n参赛条件：<br />\n本比赛开放给所有对摄影感兴趣的人士，无国籍和年龄限制。<br/>\n参赛者需上传符合主题的春季摄影作品。<br />', '参赛作品要求：<br/>\n\n主题明确，作品内容必须与“春季唤醒”相关。<br/>\n图片格式为JPG或PNG，大小不超过2MB。<br/>\n每位参赛者最多可提交1张作品。<br/>\n评选标准：<br/>\n\n与主题契合度：作品是否与活动主题相关。<br/>\n创意与表现力：作品的创意和表现力。<br/>\n技术水平：作品的摄影技术和后期处理水平。<br/>\n故事性与感染力：作品背后的故事性和感染力。<br/>\n奖项设置：<br/>\n\n一等奖1名：奖金1000元 + 荣誉证书<br/>\n二等奖1名：奖金500元 + 荣誉证书<br/>\n三等奖1名：奖金300元 + 荣誉证书<br/>\n优秀奖3名：荣誉证书<br/>\n\n参赛方式：<br/>\n参赛者需在活动期间内填写相关信息，并将作品上传至平台指定位置完成报名。<br/>\n每位参赛者需提供作品的标题、描述以及相关的摄影器材信息。<br/>\n\n活动流程：<br/>\n报名阶段：参赛者在活动期间内完成作品上传和报名。<br/>\n评选阶段：管理员对所有参赛作品进行评选和审核，并展示到平台页面；点赞数列排行前三则为获奖。<br/>\n颁奖阶段：公布评选结果，颁发奖项并通知获奖者。<br/>\n\n注意事项：<br/>\n参赛作品必须为原创作品，不得抄袭、盗用他人作品。<br/>\n参赛者需保证作品的版权归属，并同意活动主办方在活动宣传和展示中使用作品。<br/>\n活动主办方有权对参赛作品进行展示、宣传和出版等。<br/>\n如有违规行为，主办方有权取消参赛资格并追究责任。<br/>\n\n通过“春季唤醒”摄影比赛，希望能够激发摄影爱好者们对春季美好景色的记录和表达，展现春天的美丽与生机，为大家带来一场视觉盛宴。', 1, '2024-03-23 22:54:55');
INSERT INTO `competition` VALUES (6, 'http://127.0.0.1:12134/upload/2.jpeg', '人文情怀，世界之美', '活动时间： 2024年5月1日 - 2024年6月30日<br/>\n\n活动简介： 本次比赛旨在通过摄影作品展现世界各地的人文风情、人类生活的多样性和丰富性，让摄影师们用镜头捕捉到人类社会的精彩瞬间，展示人文的温情和力量。<br/>\n\n参赛条件：<br/>\n\n本比赛开放给所有对摄影感兴趣的人士，无国籍和年龄限制。<br/>\n参赛者需上传符合主题的人文纪实摄影作品。<br/>\n', '参赛作品要求：<br/>\n主题明确，作品内容必须与“人文”相关。<br/>\n图片格式为JPG或PNG，大小不超过2MB。<br/>\n每位参赛者最多可提交1张作品。<br/>\n\n评选标准：<br/>\n与主题契合度：作品是否与活动主题相关。<br/>\n创意与表现力：作品的创意和表现力。<br/>\n情感表达：作品能否引发观者的共鸣和思考。<br/>\n技术水平：作品的摄影技术和后期处理水平。<br/>\n奖项设置：<br/>\n\n\n一等奖1名：奖金1000元 + 荣誉证书<br/>\n二等奖1名：奖金500元 + 荣誉证书<br/>\n三等奖1名：奖金300元 + 荣誉证书<br/>\n优秀奖3名：荣誉证书<br/>\n\n参赛方式：<br/>\n\n参赛者需在活动期间内填写相关信息，并将作品上传至平台指定位置完成报名。<br/>\n每位参赛者需提供作品的标题、描述以及相关的摄影器材信息。<br/>\n\n活动流程：<br/>\n报名阶段：参赛者在活动期间内完成作品上传和报名。<br/>\n评选阶段：管理员对所有参赛作品进行评选和审核，并展示到平台页面；点赞数列排行前三则为获奖。<br/>\n颁奖阶段：公布评选结果，颁发奖项并通知获奖者。<br/>\n\n注意事项：<br/>\n参赛作品必须为原创作品，不得抄袭、盗用他人作品。<br/>\n参赛者需保证作品的版权归属，并同意活动主办方在活动宣传和展示中使用作品。<br/>\n活动主办方有权对参赛作品进行展示、宣传和出版等。<br/>\n如有违规行为，主办方有权取消参赛资格并追究责任。<br/>\n\n通过“人文纪实摄影赛”，希望能够通过摄影作品展现人类社会的多样性和丰富性，记录人类生活的精彩瞬间，展示人文的温情与力量，为观者呈现一场人文情怀的视觉盛宴。<br/>\n', 1, '2024-03-23 23:00:47');
INSERT INTO `competition` VALUES (7, 'http://127.0.0.1:12134/upload/3.JPG', '人像风采，美丽之眼', '活动时间： 2024年4月1日 - 2024年5月31日<br/>\n\n活动简介： 本次比赛旨在通过摄影作品展现人像摄影的魅力和艺术，展示人类面孔的多样性和美丽，让摄影师们用镜头捕捉到人物的独特魅力和内在情感，展现人像摄影的无限可能性。<br/>\n\n参赛条件：<br/>\n\n本比赛开放给所有对摄影感兴趣的人士，无国籍和年龄限制。<br/>\n参赛者需上传符合主题的人像摄影作品。<br/>', '参赛作品要求：<br/>\n\n主题明确，作品内容必须是以人物为主体的照片。<br/>\n图片格式为JPG或PNG，大小不超过2MB。<br/>\n每位参赛者最多可提交1张作品。<br/>\n评选标准：<br/>\n\n与主题契合度：作品是否与活动主题相关。<br/>\n拍摄角度与构图：作品的拍摄角度和构图是否独特、吸引人。<br/>\n表情与情感：作品能否准确表达人物的情感和内在世界。<br/>\n光影和色彩：作品的光影和色彩搭配是否和谐、美观。<br/>\n后期处理：作品的后期处理是否恰当，能否提升作品的艺术效果。<br/>\n奖项设置：<br/>\n\n\n一等奖1名：奖金1000元 + 荣誉证书<br/>\n二等奖1名：奖金500元 + 荣誉证书<br/>\n三等奖1名：奖金300元 + 荣誉证书<br/>\n优秀奖3名：荣誉证书<br/>\n\n参赛方式：<br/>\n\n参赛者需在活动期间内将作品上传至平台指定页面，并填写相关信息完成报名。<br/>\n每位参赛者需提供作品的标题、描述以及相关的摄影器材信息。<br/>\n活动流程：<br/>\n\n报名阶段：参赛者在活动期间内完成作品上传和报名。<br/>\n评选阶段：管理员对所有参赛作品进行评选和审核，并展示到平台页面；点赞数列排行前三则为获奖。<br/>\n颁奖阶段：公布评选结果，颁发奖项并通知获奖者。<br/>\n注意事项：<br/>\n\n参赛作品必须为原创作品，不得抄袭、盗用他人作品。<br/>\n参赛者需保证作品的版权归属，并同意活动主办方在活动宣传和展示中使用作品。<br/>\n活动主办方有权对参赛作品进行展示、宣传和出版等。<br/>\n如有违规行为，主办方有权取消参赛资格并追究责任。<br/>\n\n通过“人像风采摄影大赛”，我们希望能够通过摄影作品展现人像摄影的独特魅力和艺术，记录人类面孔的美丽与神韵，展现人像摄影的无限魅力，为观者带来一场人像摄影的视觉盛宴。<br/>', 1, '2024-03-23 23:02:35');

-- ----------------------------
-- Table structure for competition_list
-- ----------------------------
DROP TABLE IF EXISTS `competition_list`;
CREATE TABLE `competition_list`  (
  `id` int NOT NULL,
  `item_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cont` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `iphone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of competition_list
-- ----------------------------

-- ----------------------------
-- Table structure for user_list
-- ----------------------------
DROP TABLE IF EXISTS `user_list`;
CREATE TABLE `user_list`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户账号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户密码',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '邮箱',
  `identity` int NULL DEFAULT NULL COMMENT '身份类型：0/1/2   超级管理员/管理员/普通用户',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `like_number` int NOT NULL COMMENT '多少人收藏',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_list
-- ----------------------------
INSERT INTO `user_list` VALUES (5, 'admin', '123123', '123123', 0, 'http://127.0.0.1:12134/user/dipsad.jpg', 5);
INSERT INTO `user_list` VALUES (19, 'zxc', 'admin', '123123', 0, NULL, 0);

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
  `state` int NOT NULL COMMENT '是否上架，1/2，已上架/未上架，只有上架了才能在前端展示',
  `beiyong1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备用 图片',
  `beiyong2` int NULL DEFAULT NULL COMMENT '备用 发布者id',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `process` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '控制手段',
  `user_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户头像',
  `signature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户签名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of works_list
-- ----------------------------
INSERT INTO `works_list` VALUES (19, 'admin', 0, 0, '[\"8.jpg\"]', '记录', '人像', '人像、肖像\n佳能出图\n', 1, '', 5, '2024-03-23 22:49:50', '', 'http://127.0.0.1:12134/user/dipsad.jpg', NULL);
INSERT INTO `works_list` VALUES (20, 'admin', 0, 0, '[\" (2).JPG\",\" (9).JPG\"]', '美好当下', '风景', '风景、景象、绿植\n佳能出图', 1, '', 5, '2024-03-23 22:51:06', '', 'http://127.0.0.1:12134/user/dipsad.jpg', NULL);
INSERT INTO `works_list` VALUES (21, 'admin', 0, 1, '[\"9.JPG\",\" (9).JPG\",\" (10).JPG\"]', '扫街画面', '街景', '街头、人文\n尼康出图', 1, '', 5, '2024-03-23 23:10:21', '', 'http://127.0.0.1:12134/user/dipsad.jpg', NULL);
INSERT INTO `works_list` VALUES (22, 'admin', 0, 0, '[\"6.JPG\",\"8.JPG\",\"10.JPG\",\"11.JPG\"]', '纪实画面', '纪实', '纪实、人文、街头', 1, '', 5, '2024-03-23 22:52:35', '', 'http://127.0.0.1:12134/user/dipsad.jpg', NULL);
INSERT INTO `works_list` VALUES (23, 'admin', 0, 0, '[\"2.JPG\",\"4.JPG\",\"7.JPG\",\"8.JPG\"]', '瞬间', '人像', '人像、肖像、人物\n富士出图', 1, '', 5, '2024-03-23 22:53:43', '', 'http://127.0.0.1:12134/user/dipsad.jpg', NULL);
INSERT INTO `works_list` VALUES (24, 'admin', 0, 0, '[\"1122.jpg\"]', '测试', '人像', '测试', 2, '', 5, '2024-04-11 17:38:45', '', 'http://127.0.0.1:12134/user/dipsad.jpg', 'http://127.0.0.1:12134/signature/1712828284510.png');

SET FOREIGN_KEY_CHECKS = 1;
