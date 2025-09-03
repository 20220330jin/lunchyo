import { relations } from "drizzle-orm/relations";
import { codeGroup, code, menu, menuLikeCount, placeDetail, placeGrade, placeLikeCount, post, postHateCount, reply, postLikeCount, replyLikeCount, springSession, springSessionAttributes } from "./schema";

export const codeRelations = relations(code, ({one}) => ({
	codeGroup: one(codeGroup, {
		fields: [code.codeGroupId],
		references: [codeGroup.codeGroupId]
	}),
}));

export const codeGroupRelations = relations(codeGroup, ({many}) => ({
	codes: many(code),
}));

export const menuLikeCountRelations = relations(menuLikeCount, ({one}) => ({
	menu: one(menu, {
		fields: [menuLikeCount.menuId],
		references: [menu.menuId]
	}),
}));

export const menuRelations = relations(menu, ({many}) => ({
	menuLikeCounts: many(menuLikeCount),
}));

export const placeGradeRelations = relations(placeGrade, ({one}) => ({
	placeDetail: one(placeDetail, {
		fields: [placeGrade.placeDetailId],
		references: [placeDetail.placeDetailId]
	}),
}));

export const placeDetailRelations = relations(placeDetail, ({many}) => ({
	placeGrades: many(placeGrade),
	placeLikeCounts: many(placeLikeCount),
}));

export const placeLikeCountRelations = relations(placeLikeCount, ({one}) => ({
	placeDetail: one(placeDetail, {
		fields: [placeLikeCount.placeDetailId],
		references: [placeDetail.placeDetailId]
	}),
}));

export const postHateCountRelations = relations(postHateCount, ({one}) => ({
	post: one(post, {
		fields: [postHateCount.postId],
		references: [post.postId]
	}),
}));

export const postRelations = relations(post, ({many}) => ({
	postHateCounts: many(postHateCount),
	replies: many(reply),
	postLikeCounts: many(postLikeCount),
}));

export const replyRelations = relations(reply, ({one, many}) => ({
	post: one(post, {
		fields: [reply.postId],
		references: [post.postId]
	}),
	replyLikeCounts: many(replyLikeCount),
}));

export const postLikeCountRelations = relations(postLikeCount, ({one}) => ({
	post: one(post, {
		fields: [postLikeCount.postId],
		references: [post.postId]
	}),
}));

export const replyLikeCountRelations = relations(replyLikeCount, ({one}) => ({
	reply: one(reply, {
		fields: [replyLikeCount.replyId],
		references: [reply.replyId]
	}),
}));

export const springSessionAttributesRelations = relations(springSessionAttributes, ({one}) => ({
	springSession: one(springSession, {
		fields: [springSessionAttributes.sessionPrimaryId],
		references: [springSession.primaryId]
	}),
}));

export const springSessionRelations = relations(springSession, ({many}) => ({
	springSessionAttributes: many(springSessionAttributes),
}));