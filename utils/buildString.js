export const buildString = (data) => {
    const { time, amount, goldPrice, goldSold} = data
    return `${time}, amount paid: $${amount}, price per Oz: $${goldPrice}, gold sold: ${goldSold} Oz`
}