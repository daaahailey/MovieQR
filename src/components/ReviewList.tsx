import { InputBox } from "./InputBox"

export const ReviewList = ({movieId} : any) => {
    return <InputBox movieId={movieId} menu="review" />
}