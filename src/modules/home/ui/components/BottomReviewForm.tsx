import {Send, Star} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {CreateReviewRequest} from "@/modules/review/type/review.type";
import React, {useState} from "react";
import {useCreateReview} from "@/modules/review/queries/use-create-review-mutation";
import toast from "react-hot-toast";
import {RestaurantForReviewType} from "@/modules/home/types";

interface BottomReviewFormProps {
    restaurant: RestaurantForReviewType;
}
type ReviewFormParams = Pick<CreateReviewRequest, 'authorName' | 'rating' | 'content'>;

export const BottomReviewForm = ({restaurant}: BottomReviewFormProps) => {
    const [reviewParams, setReviewParams] = useState<ReviewFormParams>({
        rating: 1,
        content: '',
        authorName: '익명'
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {mutate, isPending} = useCreateReview();
    const handleParam = (key: keyof CreateReviewRequest, value: string | number) => {
        setReviewParams((current) => ({
            ...current,
            [key]: value
        }))
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const finalParam: CreateReviewRequest = {
            ...restaurant,
            ...reviewParams,
        }
        console.log('reviewParams', reviewParams);

        if (!finalParam.authorName) {
            toast.error("닉네임을 입력해주세요.")
            return;
        }

        if (!finalParam.rating) {
            toast.error("평점을 입력해주세요.")
            return;
        }

        if (!finalParam.content) {
            toast.error("댓글을 입력해주세요.")
            return;
        }
        console.log('finalParam', finalParam)

        mutate(finalParam);

    }
    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-3 space-y-3">
            <h4 className="text-sm text-gray-900 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500"/>
                리뷰 작성하기
            </h4>
            <div className="grid grid-cols-2 gap-2">
                <Input placeholder="닉네임" className="text-sm h-10" value={reviewParams.authorName}
                       onChange={(e) => handleParam('authorName', e.target.value)}/>
                <div className="flex items-center gap-2">
                    <span className="text-x text-gray-600">평점:</span>
                    <select className="flex-1 text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white h-10"
                            value={reviewParams.rating} onChange={(e) => handleParam('rating', Number(e.target.value))}>
                        {[5, 4, 3, 2, 1].map(rating => (
                            <option key={rating} value={rating}>
                                {'⭐'.repeat(rating)} {rating}점
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <Textarea placeholder="맛집에 대한 솔직한 리뷰를 남겨주세요..." className="text-sm resize-none h-20" rows={2}
                      value={reviewParams.content} onChange={(e) => handleParam('content', e.target.value)}/>
            <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 h-10 text-sm">
                <Send className="w-3 h-3"/>
                리뷰 등록
            </Button>
        </form>
    )
}
