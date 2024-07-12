import * as DICTIONARY from './dictionary';
import * as tf from '@tensorflow/tfjs';

const ENCODING_LENGTH = 20;


function sentenceToLowerCaseWords(sentence: string): string[] {
    return sentence.toLowerCase().replace(/[^\w\s]/g, '').split(' ');
}

export default function tokenize(setence: string): tf.Tensor2D {
    let tokens: number[] = [
        DICTIONARY.START
    ];

    const words = sentenceToLowerCaseWords(setence);

    for (const word of words) {
        const token = (DICTIONARY.LOOKUP as any)[word] as number | undefined;
        if (token !== undefined) tokens.push(token);
        else tokens.push(DICTIONARY.UNKNOWN);
    }

    while (tokens.length < ENCODING_LENGTH) tokens.push(DICTIONARY.PAD)

    return tf.tensor2d([tokens]);
}