import { Dimensions } from "react-native";

/* eslint-disable no-unused-vars */
const TRANSPARENT_FULL = 'transparent';
const TRANSPARENT_BLACK_HIGH = '#00000080';
const TRANSPARENT_BLACK_MEDIUM = '#00000050';
const TRANSPARENT_BLACK_LOW = '#00000030';
const WHITE = '#FFFFFF';

export const AppHeight = Dimensions.get('screen').height;
export const AppWidth = Dimensions.get('screen').width;

export const DimenionsMinMaxValues = {
  minWidth: 100,
  minHeight: 40,
  maxWidth: AppWidth-20,
  maxHeight: ((AppHeight/100)*10),
  borderWidth: 1,
};

// export const MAIN_HEADER_COLOR = "";
// export const MAIN_HEADER_COLOR = "";
// export const MAIN_HEADER_COLOR = "";
// export const MAIN_HEADER_COLOR = "";
// export const MAIN_HEADER_COLOR = "";
// export const MAIN_HEADER_COLOR = "";
// export const MAIN_HEADER_COLOR = "";
// export const MAIN_HEADER_COLOR = "";
// export const MAIN_HEADER_COLOR = "";
// export const MAIN_HEADER_COLOR = "";
// export const MAIN_HEADER_COLOR = "";
// export const MAIN_HEADER_COLOR = "";
// export const MAIN_HEADER_COLOR = "";
// export const MAIN_HEADER_COLOR = "";

const AppStyleConstants = {
  fontWeight: {
    regular: '400',
    medium: '600',
    bold: 'bold',
  },
  fontSizes: {
    PageHeaderSize: 25,
    ROUND_BUTTON_FONT_SIZE: 30,
  },
  paddings: {
    PageTopPadding: 20,
  },
  colors: {
    WHITE_COLOR: '#FFFFFF',
    LOGO_BLUE: '#0b0786',
    LOGO_PINK: '#e75480',
    LOGO_GREEN: '#90EE90',

    HEADER_BACKGROUND_COLOR: '#0b0786',
    HEADER_FONT_COLOR: '#e75480',

    MAIN_CONTAINER_COLOR: 'cyan',
    MAIN_HEADER_COLOR: 'gray',
    MAIN_BODY_COLOR: 'rgb(242,242,242)', //'rgb(243,240,229)',

    LIST_ITEM_BACKGROUND_COLOR: '#FFFFFF',
    LIST_ITEM_FONT_COLOR: '#000000',
    LIST_ITEM_THRESHOLD_FONT_COLOR: '#FF0000',

    BUTTON_FONT_COLOR: '#90EE90',
    BUTTON_COLOR: 'rgb(255,157,115)',
    
    ROUND_BUTTON_FONT_COLOR: '#000000',
    ROUND_BUTTON_COLOR: 'rgb(255,157,115)',//'#0b0786',

    MODAL_BACKGROUND_COLOR: '#0b0786',

    POPUP_BACKGROUND_COLOR: '#FFFFFF',
    POPUP_BUTTON_COLOR: '#787880',

    BORDER_COLOR: 'green',

    ERROR_HINT_COLOR: '#FF0000',

    LIST_CELL_BODY_COLOR: 'gray',
    LIST_CELL_NUMBER_HOLDER_COLOR: 'yellow',

    DATA_CARD_HEADER_COLOR: 'green', //"#C7C7C7",
    DATA_CARD_HEADER_TITLE_COLOR: '#000000',
    DATA_CARD_BODY_COLOR: 'maroon', //"#c9c9c9",
    DATA_CARD_BUTTON_COLOR: 'teal',

    ACTIONSHEET_BACKGROUND_COLOR: 'yellow',
    ACTIONSHEET_HEADER_COLOR: 'gray',
    ACTIONSHEET_HEADER_TEXT_COLOR: '#000000',
    ACTIONSHEET_BODY_COLOR: TRANSPARENT_FULL,
    ACTIONSHEET_BODY_TEXT_COLOR: TRANSPARENT_FULL,
    ACTIONSHEET_OPTIONS_BACKGROUND_COLOR: TRANSPARENT_FULL,
    ACTIONSHEET_OPTIONS_TEXT_COLOR: TRANSPARENT_FULL,
  },
  headerStyle: {
    headerViewStyle: {
      backgroundColor: '#0b078600',
      borderBottomColor: 'green',
      borderBottomWidth: DimenionsMinMaxValues.borderWidth,
    },
    headerTitleFontStyle: {
      color: '#000000'
    },
    headerIconStyles: {
      height: 30,
      width: 30,
    }
  },
  floatButtonActiveStyle: {
    style: {
      backgroundColor: '#0b0786'
    },
    fontStyle: {
      color: '#FFFFFF',
      fontSize: 30,
    }
  },
  buttonPopupStyle: {
    style: {
      // marginTop: 10,
      // marginBottom: 20,
      backgroundColor: '#0b0786'
    },
    fontStyle: {
      color: '#FFFFFF', //'#90EE90'
    }
  },
  buttonActiveStyle: {
    style: {
      marginTop: 10,
      // marginBottom: 20,
      backgroundColor: '#0b0786'
    },
    fontStyle: {
      color: '#FFFFFF', //'#90EE90'
    }
  },
  buttonDeleteStyle: {
    style: {
      marginBottom: 20,
      backgroundColor: '#0b0786'
    },
    fontStyle: {
      color: '#90EE90'
    }
  }
};

export default AppStyleConstants;
