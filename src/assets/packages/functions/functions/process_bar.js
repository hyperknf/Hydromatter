const bars = [
    [
        "<:bar_start_0:1098228025469972520>",
        "<:bar_start_1:1098228029370679396>",
        "<:bar_start_2:1098228031312642139>",
        "<:bar_start_3:1098228034588385300>",
        "<:bar_start_4:1098228038027710474>"
    ],
    [
        "<:bar_middle_0:1098228010655678535>",
        "<:bar_middle_1:1098228014879342683>",
        "<:bar_middle_2:1098228016192168007>",
        "<:bar_middle_3:1098228019585368094>",
        "<:bar_middle_4:1098228021439242331>"
    ],
    [
        "<:bar_end_0:1098227998118920232>",
        "<:bar_end_1:1098228360917819494>",
        "<:bar_end_2:1098228001726009375>",
        "<:bar_end_3:1098228003768651927>",
        "<:bar_end_4:1098228007002439730>"
    ]
]

module.exports = function (percentage) {
    const pointer = Math.floor(percentage / 4)
    const first = pointer == 0 ? 0 : Math.min(pointer, 5) - 1
    const second = pointer == 5 ? 1 : Math.min(Math.max(pointer - 5, 0), 4)
    const third = pointer == 10 ? 1 : Math.min(Math.max(pointer - 10, 0), 4)
    const fourth = pointer == 15 ? 1 : Math.min(Math.max(pointer - 15, 0), 4)
    const fifth = pointer == 20 ? 1 : Math.min(Math.max(pointer - 20, 0), 4)
    return bars[0][first] + bars[1][second] + bars[1][third] + bars[1][fourth] + bars[2][fifth]
}