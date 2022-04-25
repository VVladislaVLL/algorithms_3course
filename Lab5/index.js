// import { NFDH } from './alghoritms';
// import { Rectangle } from './Rectangle';

const BOX_HEIGHT = 700;

class Rectangle {
    element;
    size;

    constructor(width, height) {
        this.element = document.createElement('div');
        this.size = {
            width: width,
            height: height
        };
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.classList.add('block');
    }

    insertElement(x, y) {
        const box = document.getElementById('box');
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
        box.appendChild(this.element);
    }

    get width() {
        return this.size.width;
    }

    get height() {
        return this.size.height;
    }
}

const getHeight = (levelHeightObj, rectHeight) => {
    const baseHeight = BOX_HEIGHT - levelHeightObj.levelHeight;
    return levelHeightObj.maxRectHeightForCurrentLevel > rectHeight
        ? baseHeight + (levelHeightObj.maxRectHeightForCurrentLevel - rectHeight)
        : baseHeight
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function generateRectangles(n, max, min, k) {
    const rectangles = [];
    for (let i = 0; i < n; i++) {
        const height = randomInteger(min, max);
        let width;
        if (k != null) {
            width = Math.round(k * height);
        } else {
            width = randomInteger(min, max);
        }
        rectangles.push(new Rectangle(width, height));
    }
    return rectangles;
}

function NFDH(rectangles, stripWidth) {
    let level = 0;
    const levelWidths = [];
    const levelHeights = [];
    rectangles.sort((rect1, rect2) => {
        return rect1.height > rect2.height ? -1 : 1;
    });
    levelWidths.push(0);
    levelHeights.push({
        levelHeight: rectangles[0].height,
        maxRectHeightForCurrentLevel: rectangles[0].height,
    })

    for (let i = 0; i < rectangles.length; i++) {
        if (stripWidth - levelWidths[level] >= rectangles[i].width) {
            rectangles[i].insertElement(levelWidths[level], getHeight(levelHeights[level], rectangles[i].height));
            levelWidths[level] += rectangles[i].width;
        } else {
            level++;
            levelWidths[level] = 0;
            levelHeights[level] = {
                levelHeight: levelHeights[level - 1].levelHeight + rectangles[i].height,
                maxRectHeightForCurrentLevel: rectangles[i].height,
            }
            rectangles[i].insertElement(levelWidths[level], getHeight(levelHeights[level], rectangles[i].height));
            levelWidths[level] += rectangles[i].width;
        }
    }
    return levelHeights[level];
}

function FFDH(rectangles, stripWidth) {
    let level = 0;
    const levelWidths = [];
    const levelHeights = [];
    rectangles.sort((rect1, rect2) => {
        return rect1.height > rect2.height ? -1 : 1;
    });
    levelWidths.push(0);
    levelHeights.push({
        levelHeight: rectangles[0].height,
        maxRectHeightForCurrentLevel: rectangles[0].height,
    })

    for (let i = 0; i < rectangles.length; i++) {
        const index = levelWidths.findIndex((levelWidth) => stripWidth - levelWidth >= rectangles[i].width);
        if (index !== -1) {
            rectangles[i].insertElement(levelWidths[index], getHeight(levelHeights[index], rectangles[i].height));
            levelWidths[index] += rectangles[i].width;
        } else {
            level++;
            levelWidths[level] = 0;
            levelHeights[level] = {
                levelHeight: levelHeights[level - 1].levelHeight + rectangles[i].height,
                maxRectHeightForCurrentLevel: rectangles[i].height,
            }
            rectangles[i].insertElement(levelWidths[level], getHeight(levelHeights[level], rectangles[i].height));
            levelWidths[level] += rectangles[i].width;
        }
    }
}

function BFDH(rectangles, stripWidth) {
    let level = 0;
    const levelWidths = [];
    const levelHeights = [];
    rectangles.sort((rect1, rect2) => {
        return rect1.height > rect2.height ? -1 : 1;
    });
    levelWidths.push(0);
    levelHeights.push({
        levelHeight: rectangles[0].height,
        maxRectHeightForCurrentLevel: rectangles[0].height,
    })

    for (let i = 0; i < rectangles.length; i++) {
        const filtered = levelWidths.filter((levelWidth) => stripWidth - levelWidth >= rectangles[i].width);
        const filteredWidth = filtered.map(levelWidth => (stripWidth - levelWidth));
        const minWidth = Math.min(...filteredWidth);
        const index = levelWidths.findIndex((width ) => stripWidth - width === minWidth);
        if (index !== -1) {
            rectangles[i].insertElement(levelWidths[index], getHeight(levelHeights[index], rectangles[i].height));
            levelWidths[index] += rectangles[i].width;
        } else {
            level++;
            levelWidths[level] = 0;
            levelHeights[level] = {
                levelHeight: levelHeights[level - 1].levelHeight + rectangles[i].height,
                maxRectHeightForCurrentLevel: rectangles[i].height,
            }
            rectangles[i].insertElement(levelWidths[level], getHeight(levelHeights[level], rectangles[i].height));
            levelWidths[level] += rectangles[i].width;
        }
    }
}

function SF(rectangles, stripWidth) {
    rectangles.sort((rect1, rect2) => {
        return rect1.width > rect2.width ? 1 : -1;
    });

    const index = rectangles.findIndex(rect => rect.width >= stripWidth / 2);
}

const RECTAGLES = generateRectangles(30, 300,30)

// NFDH(RECTAGLES, 700)
// FFDH(RECTAGLES, 700)
// BFDH(RECTAGLES, 700)
// BFDH(RECTAGLES, 700)
// SF(RECTAGLES, 700)



