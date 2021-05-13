import {
  DATA_FETCHED,
  ADD_NEW_TAG,
  DELETE_CARD,
  ActionTypes,
} from "./ApiActions";

interface initialStateInterface {
  data: [];
  tags: [];
}

const initialState: initialStateInterface = {
  data: [],
  tags: [],
};

const _updateCategories = (data: []) => {
  let categoriesAll: any = [];
  // [... new Set(a)]
  data.forEach((item: any) => {
    if (Array.isArray(item.categories)) {
      item.categories.forEach((categ: any) => {
        // categoriesAll.push(categ);
        if (!categoriesAll.includes(categ.name)) {
          categoriesAll = [...categoriesAll, categ.name];
        }
      });
    }
  });
  // let categoriesWithoutDuplicates: any = [...new Set(categoriesAll)];
  return categoriesAll;
};

const _updateCategoriesWithNewTag = (newTag: string, tags: any) => {
  let categoriesAll: any = [];
  if (!tags.includes(newTag)) {
    categoriesAll = [...tags, newTag];
  } else {
    categoriesAll = tags;
  }
  return categoriesAll;
};

const _deleteById = (id: string, data: any) => {
  return data.filter((item: any) => {
    if (id === item.id) {
      return false; // delete
    }
    return true;
  });
};

const apiReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case DATA_FETCHED:
      return {
        ...state,
        data: action.payload,
        tags: _updateCategories(action.payload),
      };
    case ADD_NEW_TAG:
      return {
        ...state,
        tags: _updateCategoriesWithNewTag(action.payload, state.tags),
      };
    case DELETE_CARD:
      return {
        ...state,
        data: _deleteById(action.payload, state.data),
      };
    default:
      return state;
  }
};

export default apiReducer;
