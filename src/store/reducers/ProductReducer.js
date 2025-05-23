const initialState={
    products:null,
    categories:null,
    pagination:{},
};

// Decide how the data should change when something happen iin action
export const producerReducer=(state=initialState,action)=>{
    switch(action.type){
        case "FETCH_PRODUCTS":
            return {
                ...state,
                products:action.payload,
                pagination:{
                    ...state.pagination,
                    pageNumber:action.pageNumber,
                    pageSize:action.pageSize,
                    totalElements:action.totalElements,
                    totalPages:action.totalPages,
                    lastPage:action.lastPage,
                }
            };

            
        default:
            return state;

    }
};