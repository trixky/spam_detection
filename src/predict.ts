import * as tf from '@tensorflow/tfjs';
import * as tfn from '@tensorflow/tfjs-node';
import tokenize from './tokenizer';

interface SpamPrediction {
    confidence: number;
}

let model: tf.LayersModel | undefined = undefined;

const handler = tfn.io.fileSystem("./model/model.json");

async function loadAndPredict(inputTensor: tf.Tensor<tf.Rank>): Promise<SpamPrediction> {
    if (model === undefined) {
        model = await tf.loadLayersModel(handler);
    }

    const results = await model.predict(inputTensor) as tf.Tensor<tf.Rank>;

    const truePercentage = Math.round(results.dataSync()[0] * 100);

    return <SpamPrediction>{
        confidence: truePercentage
    };
}

export default async function predict(sentence: string): Promise<SpamPrediction> {
    const inputTensor = tokenize(sentence);
    return await loadAndPredict(inputTensor);
}
