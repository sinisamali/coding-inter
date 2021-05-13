import { DATA_FETCHED, ActionTypes } from "./ApiActions";

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

const apiReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case DATA_FETCHED:
      return {
        ...state,
        data: action.payload,
        tags: _updateCategories(action.payload),
      };
    default:
      return state;
  }
};

export default apiReducer;
