import PropTypes from "prop-types";

export const menuItemPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export const baseUrl = "https://norma.nomoreparties.space/api/";

export const socketFeed = {
  "success": true,
  "orders": [
    {
      "ingredients": [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733ce",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733ca",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733cc",
      ],
      "_id": "123123",
      "status": "done",
      "number": 1,
      "createdAt": "2021-06-23T20:11:01.403Z",
      "updatedAt": "2021-06-23T20:11:01.406Z"
    },
    {
      "ingredients": [
        "60d3b41abdacab0026a733d1",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733c9",
      ],
      "_id": "444433",
      "status": "done",
      "number": 3,
      "createdAt": "2022-04-26T20:13:23.654Z",
      "updatedAt": "2022-04-26T20:13:23.657Z"
    },
    {
      "ingredients": [
        "60d3b41abdacab0026a733ce",
        "60d3b41abdacab0026a733d2"
      ],
      "_id": "143433",
      "status": "done",
      "number": 5,
      "createdAt": "2022-04-25T11:14:23.654Z",
      "updatedAt": "2022-04-25T10:16:23.657Z"
    }
  ],
  "total": 2,
  "totalToday": 2
} ;


