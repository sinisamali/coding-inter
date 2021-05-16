import {
  DATA_FETCHED,
  ADD_NEW_TAG,
  DELETE_CARD,
  ADD_NEW_IMAGE,
  ActionTypes,
} from "./ApiActions";

interface Data {
  id: string;
}
interface initialStateInterface {
  data: Data[];
  tags: [];
}

const initialState: initialStateInterface = {
  data: [],
  tags: [],
};

const _updateCategories = (data: []) => {
  let categoriesAll: any = [];
  data.forEach((item: any) => {
    if (Array.isArray(item.categories)) {
      item.categories.forEach((categ: any) => {
        if (!categoriesAll.includes(categ.name)) {
          categoriesAll = [...categoriesAll, categ.name];
        }
      });
    }
  });

  return categoriesAll;
};

const _updateCategoriesWithNewTag = (newTag: string, tags: any) => {
  let categoriesAll: any = [];
  if (!tags.includes(newTag)) {
    return (categoriesAll = [...tags, newTag]);
  }

  return (categoriesAll = tags);
};

const _delateCard = (id: string, data: any) => {
  return data.filter((item: any) => id !== item.id);
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
        data: _delateCard(action.payload, state.data),
      };
    case ADD_NEW_IMAGE:
      return {
        ...state,
        data: [...action.payload, ...state.data],
      };
    default:
      return state;
  }
};

export default apiReducer;
