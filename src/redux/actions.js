// actions.js
import { ADD_IMAGE, DELETE_IMAGE, SEARCH, NEWIMAGE, LOADING } from './constant';
import { deletepic, incrementalSearch, addImage, getKeyWords, createItem } from '../utils'

//  delete image from state in image and in search result
export function deleteImage(array, id, search) {
    var newState = deletepic(array, id)
    var newsStateSearch = (search.length > 0) ? deletepic(search, id) : []
    return {
        type: DELETE_IMAGE,
        newState,
        newsStateSearch
    }
}
// search
export function search(array, val) {
    var newState = incrementalSearch(array, val)
    return {
        type: SEARCH,
        newState
    }
}
// take new image, get image keywords, and save to store
export const newIMage = () => (dispatch) => {
    addImage().then((image) => {
        if (image != undefined) {
            dispatch({
                type: LOADING,
                indicator: false
            })
            var vertical = (image.height > image.width) ? true : false
            getKeyWords(image.data).then((concepts) => {
                if(concepts.length > 0)
                    {
                        var item = createItem(concepts, image.uri, vertical)
                        dispatch({
                            type: NEWIMAGE,
                            item: item
                        })
                    }
                dispatch({
                    type: LOADING,
                    indicator: true
                })
            })
        }
    })
}