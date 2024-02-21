import {Cheerio, AnyNode, load} from 'cheerio';
import {isText, isTag, hasChildren} from 'domhandler'
import dictionnary from './dictionary.json'

const dictionaryKeys = Object.keys(dictionnary)
const dictionnaryKeysPattern = new RegExp(`${dictionaryKeys.join('|')}`, 'g')

const changeTextNodes = ($, element: Cheerio<AnyNode>) => {
    element.each((i, el) => {
        if (isText(el)) {
            const initialText = el.data
            if(dictionnaryKeysPattern.test(initialText)){
                const after = initialText.replaceAll(dictionnaryKeysPattern, (match) => dictionnary[match])
                el.data = after
            }
        }
        if( isTag(el) && hasChildren(el)){
                for (let i = 0; i < el.children.length; i++) {
                    changeTextNodes($, $(el.children[i]))
                }
        }
    })
} 

export default  (html: string):string => {
    const $ = load(html);

    changeTextNodes($, $('body > *').filter((i,el) => el.name !== 'script'))
    
    return $.html()
}