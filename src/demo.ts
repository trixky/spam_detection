import predict from './predict';

const sentences = [
    "This is a sentence that is not spam",
    "Check my own website for free money",
    "You have won a free vacation",
    "Tthank you for your work. this content is really great"
]

async function main() {
    console.log("========================================== % SPAM DETECTION %")
    for (const sentence of sentences) {
        console.log("-----------------")
        console.log("Predicting: ", sentence)
        console.log(await predict(sentence));
    }
}

main();