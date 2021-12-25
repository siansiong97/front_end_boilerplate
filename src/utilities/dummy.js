import { forEach, get, isNumber, isArray, isEmpty, shuffle, slice } from 'lodash';
import moment from 'moment';


function generateDummyInt(min = 0, max = 10, fixedPoint = 0) {

    if (isNumber(min) && !isNumber(max)) {
        max = min;
        min = 0;
    }
    return parseFloat(Math.random() * (max - min) + min).toFixed(fixedPoint);
}

function generateDummyBoolean() {
    return Math.random() < 0.5;
}

function generateDummyImage(length = 1, width = 200, height = 300) {

    if (!isNumber(width)) {
        width = 200;
    }
    if (!isNumber(height)) {
        height = 300;
    }
    let images = [
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
        `https://source.unsplash.com/random/${width}x${height}?sig=${generateDummyInt(1, 1000)}`,
    ]
    if (!isNumber(length)) {
        length = 1;
    }
    if (length > images.length) {
        length = images.length;
    }

    images = shuffle(images);


    return length === 1 ? images[0] : slice(images, length);
}


function generateDummyVideo(length = 1) {

    let videos = [
        'https://vimeo.com/7466309',
        'https://vimeo.com/10985679',
        'https://vimeo.com/85683143',
        'https://vimeo.com/45272625',
        'https://vimeo.com/282191207',
        'https://www.youtube.com/watch?v=3TWnpeFg_wo&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=10&ab_channel=%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel',
        'https://www.youtube.com/watch?v=UTT4x4_D3xE&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=10&ab_channel=%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E9%9F%B3%E4%B9%90%E4%BA%BA%E5%AE%98%E6%96%B9%E9%A2%91%E9%81%93',
        'https://www.youtube.com/watch?v=KBpkD06Yp_o&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=12&ab_channel=%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E9%9F%B3%E4%B9%90%E4%BA%BA%E5%AE%98%E6%96%B9%E9%A2%91%E9%81%93',
        'https://www.youtube.com/watch?v=pR3bvNzeWJc&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=14&ab_channel=%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E9%9F%B3%E4%B9%90%E4%BA%BA%E5%AE%98%E6%96%B9%E9%A2%91%E9%81%93',
        'https://www.youtube.com/watch?v=5sbFn-FPdAk&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=16&ab_channel=%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E9%9F%B3%E4%B9%90%E4%BA%BA%E5%AE%98%E6%96%B9%E9%A2%91%E9%81%93',
        'https://www.youtube.com/watch?v=LWSEVA0S3j0&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=17&ab_channel=%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E9%9F%B3%E4%B9%90%E4%BA%BA%E5%AE%98%E6%96%B9%E9%A2%91%E9%81%93',
        'https://www.youtube.com/watch?v=fF_4a_AOPTQ&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=21&ab_channel=gm00888095gm00888095',
        'https://www.youtube.com/watch?v=NTrml2KJ7jk&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=23&ab_channel=%E8%98%87%E6%89%93%E7%B6%A0sodagreen%E8%98%87%E6%89%93%E7%B6%A0sodagreen%E5%B7%B2%E9%AA%8C%E8%AF%81',
        'https://www.youtube.com/watch?v=83TjxZWFXVI&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=24&ab_channel=%E8%98%87%E6%89%93%E7%B6%A0sodagreen%E8%98%87%E6%89%93%E7%B6%A0sodagreen%E5%B7%B2%E9%AA%8C%E8%AF%81',
        'https://www.youtube.com/watch?v=uSdbiZQyPwE&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=25&ab_channel=MingChunLiuMingChunLiu',
        'https://www.youtube.com/watch?v=2HwQQwDWO2s&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=27&ab_channel=%E8%98%87%E6%89%93%E7%B6%A0sodagreen%E8%98%87%E6%89%93%E7%B6%A0sodagreen%E5%B7%B2%E9%AA%8C%E8%AF%81',
        'https://www.youtube.com/watch?v=WWCOypHRxwI&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=29&ab_channel=sodagreenofficialsodagreenofficial',
        'https://www.youtube.com/watch?v=UV7jI2Gkehw&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=30&ab_channel=ubeMacubeMac',
        'https://www.youtube.com/watch?v=_dqLb1xG26Y&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=31&ab_channel=%E6%B5%99%E6%B1%9F%E5%8D%AB%E8%A7%86%E9%9F%B3%E4%B9%90%E9%A2%91%E9%81%93ZJSTVMusicChannel-%E6%AC%A2%E8%BF%8E%E8%AE%A2%E9%98%85-%E6%B5%99%E6%B1%9F%E5%8D%AB%E8%A7%86%E9%9F%B3%E4%B9%90%E9%A2%91%E9%81%93ZJSTVMusicChannel-%E6%AC%A2%E8%BF%8E%E8%AE%A2%E9%98%85-',
        'https://www.youtube.com/watch?v=A6g0ncregRc&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=37&ab_channel=%E8%98%87%E6%89%93%E7%B6%A0sodagreen%E8%98%87%E6%89%93%E7%B6%A0sodagreen',
        'https://www.youtube.com/watch?v=cuEja-aL1Uk&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=38&ab_channel=%E8%98%87%E6%89%93%E7%B6%A0sodagreen%E8%98%87%E6%89%93%E7%B6%A0sodagreen%E5%B7%B2%E9%AA%8C%E8%AF%81',
        'https://www.youtube.com/watch?v=ateMdTtm3rY&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=44&ab_channel=%E8%98%87%E6%89%93%E7%B6%A0sodagreen%E8%98%87%E6%89%93%E7%B6%A0sodagreen%E5%B7%B2%E9%AA%8C%E8%AF%81',
        'https://www.youtube.com/watch?v=BwgCurwoiK0&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=45&ab_channel=%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E9%9F%B3%E4%B9%90%E4%BA%BA%E5%AE%98%E6%96%B9%E9%A2%91%E9%81%93',
        'https://www.youtube.com/watch?v=BFGSkRuoTx4&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=46&ab_channel=%E8%98%87%E6%89%93%E7%B6%A0sodagreen%E8%98%87%E6%89%93%E7%B6%A0sodagreen%E5%B7%B2%E9%AA%8C%E8%AF%81',
        'https://www.youtube.com/watch?v=niAK5NaPrsA&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=51&ab_channel=%E8%8B%8F%E6%89%93%E7%BB%BF-%E4%B8%BB%E9%A2%98%E8%8B%8F%E6%89%93%E7%BB%BF-%E4%B8%BB%E9%A2%98',
        'https://www.youtube.com/watch?v=qJF9JHI8eU8&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=59&ab_channel=sodagreenofficialsodagreenofficial',
        'https://www.youtube.com/watch?v=Jg34oKzDgto&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=76&ab_channel=%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E9%9F%B3%E4%B9%90%E4%BA%BA%E5%AE%98%E6%96%B9%E9%A2%91%E9%81%93',
        'https://www.youtube.com/watch?v=5Yoxv_PAJcE&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=81&ab_channel=%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E9%9F%B3%E4%B9%90%E4%BA%BA%E5%AE%98%E6%96%B9%E9%A2%91%E9%81%93',
        'https://www.youtube.com/watch?v=LV7eT2_VwMw&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=84&ab_channel=%E8%98%87%E6%89%93%E7%B6%A0sodagreen%E8%98%87%E6%89%93%E7%B6%A0sodagreen%E5%B7%B2%E9%AA%8C%E8%AF%81',
        'https://www.youtube.com/watch?v=sJlHuWJI1v0&list=PLzErmEkduO5KY8Y2CXFLNOBszd1x-cABf&index=120&ab_channel=%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E5%90%B3%E9%9D%92%E5%B3%B0%E5%AE%98%E6%96%B9%E5%B0%88%E5%B1%AC%E9%A0%BB%E9%81%93WuQingFeng%27sOfficialChannel%E9%9F%B3%E4%B9%90%E4%BA%BA%E5%AE%98%E6%96%B9%E9%A2%91%E9%81%93',
    ]
    if (!isNumber(length)) {
        length = 1;
    }
    if (length > videos.length) {
        length = videos.length;
    }

    videos = shuffle(videos);


    return length === 1 ? videos[0] : slice(videos, length);
}


function generateDummyString(length) {
    var verbs, nouns, adjectives, adverbs, preposition;
    nouns = ["bird", "clock", "boy", "plastic", "duck", "teacher", "old lady", "professor", "hamster", "dog"];
    verbs = ["kicked", "ran", "flew", "dodged", "sliced", "rolled", "died", "breathed", "slept", "killed"];
    adjectives = ["beautiful", "lazy", "professional", "lovely", "dumb", "rough", "soft", "hot", "vibrating", "slimy"];
    adverbs = ["slowly", "elegantly", "precisely", "quickly", "sadly", "humbly", "proudly", "shockingly", "calmly", "passionately"];
    preposition = ["down", "into", "up", "on", "upon", "below", "above", "through", "across", "towards"];

    function sentence() {
        var rand1 = Math.floor(Math.random() * 10);
        var rand2 = Math.floor(Math.random() * 10);
        var rand3 = Math.floor(Math.random() * 10);
        var rand4 = Math.floor(Math.random() * 10);
        var rand5 = Math.floor(Math.random() * 10);
        var rand6 = Math.floor(Math.random() * 10);
        var content = "The " + adjectives[rand1] + " " + nouns[rand2] + " " + adverbs[rand3] + " " + verbs[rand4] + " because some " + nouns[rand1] + " " + adverbs[rand1] + " " + verbs[rand1] + " " + preposition[rand1] + " a " + adjectives[rand2] + " " + nouns[rand5] + " which, became a " + adjectives[rand3] + ", " + adjectives[rand4] + " " + nouns[rand6] + ".";


        return content;
    }

    if (isNumber(length)) {
        return sentence().slice(0, length)
    } else {
        return sentence();
    }
}

function generateDummyName() {
    var nouns;
    nouns = ["Alice", "Bob", "Eddy", "Kun", "ZC", "Yukkie", "Terk", "Edmond", "Timmy", 'Long Long'];

    var rand1 = Math.floor(Math.random() * 10);
    return nouns[rand1];

}
function generateDummyDate() {
    let date = moment().add(generateDummyInt(-100000, 100000));
    return date;
}



function generateDummyObj(config = []) {
    let obj = {};
    if (isArray(config) && !isEmpty(config)) {
        forEach(config, (item, index) => {
            switch (get(item, 'type')) {
                case 'string':
                    obj[get(item, 'name') || `item${index}`] = generateDummyString()
                    break;
                case 'code':
                    obj[get(item, 'name') || `item${index}`] = new Date().getTime()
                    break;
                case 'date':
                    obj[get(item, 'name') || `item${index}`] = generateDummyDate()
                    break;
                case 'name':
                    obj[get(item, 'name') || `item${index}`] = generateDummyName()
                    break;
                case 'int':
                    obj[get(item, 'name') || `item${index}`] = generateDummyInt(0, 1000000)
                    break;
                case 'double':
                    obj[get(item, 'name') || `item${index}`] = generateDummyInt(0, 1000.9999, 2)
                    break;
                case 'boolean':
                    obj[get(item, 'name') || `item${index}`] = generateDummyBoolean()
                    break;
                case 'image':
                    obj[get(item, 'name') || `item${index}`] = generateDummyImage(1)
                    break;
                case 'images':
                    obj[get(item, 'name') || `item${index}`] = generateDummyImage(3)
                    break;
                case 'video':
                    obj[get(item, 'name') || `item${index}`] = generateDummyVideo(1)
                case 'videos':
                    obj[get(item, 'name') || `item${index}`] = generateDummyVideo(3)
                    break;
                case 'selection':
                    obj[get(item, 'name') || `item${index}`] = get(shuffle(get(item, 'options')), '[0]', null)
                    break;
                case 'object':
                    obj[get(item, 'name') || `item${index}`] = generateDummyObj(get(item, 'config'))
                    break;
                default:
                    obj[get(item, 'name') || `item${index}`] = null
                    break;
            }
        })
    } else {
        obj = {
            dummyInt: generateDummyInt(0, 1000),
            dummyStr: generateDummyString(),
            dummyBoolean: generateDummyBoolean(),
            dummyImage: generateDummyImage(1),
            dummyImages: generateDummyImage(3),
            dummyVideo: generateDummyVideo(1),
            dummyVideos: generateDummyVideo(3),
        };
    }


    return obj;
}

function generateDummyArrayObj(length = 10, config = []) {
    if (!isNumber(length)) {
        length = 10;
    }

    return [...Array(length)].map(() => {
        return generateDummyObj(config);
    })
}

function generateDummyArrayInt(length = 10) {
    if (!isNumber(length)) {
        length = 10;
    }

    return [...Array(length)].map(() => {
        return generateDummyInt(0, 10, 0);
    })
}

function generateDummyArrayStr(length = 10) {
    if (!isNumber(length)) {
        length = 10;
    }

    return [...Array(length)].map(() => {
        return generateDummyString();
    })
}

const PAGESIZE = 30
async function getDummyDataAPI(itemType = 'object', config = {}) {

    let limit = get(config, 'limit')
    if (!isNumber(limit)) {
        limit = PAGESIZE;
    }

    let data;
    switch (itemType) {
        case 'string':
            data = generateDummyString()
            break;
        case 'date':
            data = generateDummyDate()
            break;
        case 'name':
            data = generateDummyName()
            break;
        case 'int':
            data = generateDummyInt(0, 100000)
            break;
        case 'code':
            data = new Date().getTime()
            break;
        case 'double':
            data = generateDummyInt(0, 1000.9999, 2)
            break;
        case 'boolean':
            data = generateDummyBoolean()
            break;
        case 'image':
            data = generateDummyImage(1)
            break;
        case 'images':
            data = generateDummyImage(3)
            break;
        case 'video':
            data = generateDummyVideo(1)
        case 'videos':
            data = generateDummyVideo(3)
            break;
        case 'object':
            data = generateDummyObj(get(config, 'objConfig'))
            break;
        default:
            data = generateDummyArrayObj(limit, get(config, 'objConfig'))
            break;
    }

    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data: data,
                total: limit * 10,
                limit: limit,
            })
        }, 2000);
    })


}
export {
    getDummyDataAPI,
    generateDummyInt,
    generateDummyString,
    generateDummyObj,
    generateDummyArrayObj,
    generateDummyArrayInt,
    generateDummyArrayStr,
    generateDummyImage,
    generateDummyVideo,
    generateDummyDate,
};

