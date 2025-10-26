const adjectives = [
    'sleepy', 'vibe', 'funny', 'cosmic', 'loud', 'tiny', 'lazy', 'mystic', 'witty', 'sassy',
    'cool', 'breezy', 'midnight', 'groovy', 'weird', 'spicy', 'fuzzy', 'moody', 'shy', 'bold',
    'crunchy', 'electric', 'frozen', 'dreamy', 'vivid', 'chaotic', 'sneaky', 'bouncy', 'cloudy', 'zesty'
];

const nouns = [
    'panda', 'otter', 'pickle', 'wizard', 'banana', 'ghost', 'raccoon', 'ninja', 'waffle', 'pirate',
    'taco', 'bean', 'dragon', 'robot', 'breeze', 'snail', 'cupcake', 'jelly', 'joker', 'vortex',
    'bubble', 'cloud', 'moon', 'spark', 'storm', 'sloth', 'muffin', 'duck', 'mango', 'pebble'
];

export async function generateUniqueUsername(): Promise<string> {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 99);
    return `${adj}_${noun}_${num}`;
}
