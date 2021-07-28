import {Question} from './question';

export const QUESTIONS: Question[] = [
    {
        id: 1,
        questionName: 'Choose the closest meaning to word to FASTIDIOUS ',
        answer: 'choosy',
        level: 'easy',
        options: [
            'chic',
            'loyal',
            'protective',
            'choosy'
        ],
        category: 'psychometric',
        type: 'multiple',
    },
    {
        id: 2,
        questionName: 'Explain why Solar energy is hardly available in the winter.',
        answer: 'sun is hardly effective in the winter, which means that solar energy isn’t really available in the winter',
        level: 'hard',
        options: [],
        category: 'psychometric',
        type: 'descriptive',
    },
    {
        id: 3,
        questionName: 'A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?',
        answer: '150 metres',
        level: 'easy',
        options: [
            '120 metres',
            '180 metres',
            '324 metres',
            '150 metres'
        ],
        category: 'aptitude',
        type: 'multiple',
    },
    {
        id: 4,
        // eslint-disable-next-line max-len
        questionName: 'Two trains running in opposite directions cross a man standing on the platform in 27 seconds and 17 seconds respectively and they cross each other in 23 seconds. The ratio of their speeds is:',
        answer: '3:2',
        level: 'hard',
        options: [
        ],
        category: 'aptitude',
        type: 'descriptive',
    },
    {
        id: 5,
        questionName: 'What fictional character do you most relate to and why?',
        answer: 'I dont know',
        level: 'easy',
        options: [
        ],
        category: 'creativity',
        type: 'descriptive',
    },
    {
        id: 6,
        // eslint-disable-next-line max-len
        questionName: 'The team leader has just made an impassioned plea to improve the level of cooperation that exists within the group. As the discussion develops you note:',
        answer: 'All team members really seem concerned with helping each other, and working as a team',
        level: 'easy',
        options: [
            'All team members really seem concerned with helping each other, and working as a team',
            'The majority of the team members are in favor of improving teamwork',
            'The team members are split-half are in favor of improving teamwork half would rather operate independently',
            'The majority of the team members want to continue to operate independently'
        ],
        category: 'teamwork',
        type: 'multiple',
    },
    {
        id: 9,
        questionName: 'Adjusting to a new schedule, changing schools, and moving to a new home are all examples of:',
        answer: 'Adaptability skills',
        level: 'easy',
        options: [
            'Adaptability skills',
            'Basic skills',
            'Math skills',
            'Teamwork Skills'
        ],
        category: 'adaptability',
        type: 'multiple',
    },
    {
        id: 7,
        questionName: 'How do you adjust to changes that you have no control over?',
        answer: 'I dont know',
        level: 'hard',
        options: [ ],
        category: 'adaptability',
        type: 'descriptive',
    },
    {
        id: 8,
        questionName: '"If you dont keep quiet I shall shoot you", he said to her in a calm voice.',
        answer: 'Calmly he warned her that be quiet or else he will have to shoot her.',
        level: 'easy',
        options: [
            'He warned her to shoot if she didnt keep quiet calmly.',
            'He said calmly that I shall shoot you if you dont be quiet.',
            'He warned her calmly that he would shoot her if she didnt keep quiet.',
            'Calmly he warned her that be quiet or else he will have to shoot her.'
        ],
        category: 'verbal',
        type: 'multiple',
    }
];
