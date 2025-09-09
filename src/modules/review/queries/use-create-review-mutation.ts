import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CreateReviewRequest, CreateReviewResponse} from "@/modules/review/type/review.type";
import {reviewQueryKeys} from "@/modules/review/queries/use-review-queries";

interface UseCreateReviewOptions {
    onSuccess?: (data: CreateReviewResponse) => void;
}

export const useCreateReview = (options?: UseCreateReviewOptions) => {
    const queryClient = useQueryClient();

    return useMutation<CreateReviewResponse, Error, CreateReviewRequest>({
        mutationFn: async (body) => {
            const response = await fetch('api/reviews', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '리뷰 생성에 실패했습니다.');
            }

            return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [reviewQueryKeys.all[0], reviewQueryKeys.counts([])[1]]
            });
            options?.onSuccess?.(data)
        }
    })
}
