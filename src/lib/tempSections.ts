import { serverTimestamp } from "firebase/firestore";

export const STATIC_SECTION_DATA = [
    {
        id : 'wdwd',
        data : [
            {
                id : '212',
                title : 'Ultra Duration For Long Time',
                url : '',
                created_at : new Date()
            },
            {
                id : 'x677',
                title : 'Wiht Our New Flavour',
                url : '',
                created_at : new Date()
            },
            {
                id : '3221093',
                title : 'Forget To Worri About Time Enjoy',
                url : '',
                created_at : new Date()
            },
        ],
        created_at : serverTimestamp()
    },
    {
        id : 'Linkdin Jobs',
        data : [],
        created_at : serverTimestamp()
    }
]