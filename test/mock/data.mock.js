window.Mocks = window.Mocks || {};
Mocks.classifications = [
    {
        label: 'Article type',
        prefix: 'article',
        tags: [
            { label:'Portfolio', tag: 'topic-portfolio' },
            { label:'Category', tag: 'topic-category' },
            { label:'Guide', tag: 'topic-guide' },
            { label:'Topic', tag: 'topic' },
            { label:'How-To', tag: 'howto' },
            { label:'Reference', tag: 'reference' }
        ]
    },
    {
        label: 'Stage',
        prefix: 'stage',
        tags:[
            { label: 'Stub', tag: 'stub' },
            { label: 'Draft', tag: 'draft' },
            { label: 'Review', tag: 'review' },
            { label: 'Final', tag: 'final' },
            { label: 'Outdated', tag: 'outdated' },
            { label: 'Obsolete', tag: 'obsolete' }
        ]
    },
    {
        label: 'Custom Tag',
        prefix: 'test',
        recursive: true,
        tags:[
            { label: 'Apples', tag: 'a' },
            { label: 'Bananas', tag: 'b' },
            { label: 'Oranges', tag: 'c' }
        ]
    }
];
