import { RevolvingDot } from 'react-loader-spinner'

export default function LoadingSpinner() {
    return (
        <RevolvingDot
        height="100"
        width="100"
        radius="6"
        color="white"
        secondaryColor=''
        ariaLabel="revolving-dot-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
    )
}