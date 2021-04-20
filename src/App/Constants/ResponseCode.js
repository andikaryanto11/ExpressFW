class ResponseCode {

     static OK = {
		'Status' : 'OK',
		'Code'   : 1000,
	};

	//Fail
	static INVALID_LOGIN         = {
		'Status' : 'INVALID_LOGIN',
		'Code'   : 2000,
	};
	static NO_ACCESS_USER_MODULE = {
		'Status' : 'NO_ACCESS_USER_MODULE',
		'Code'   : 2001,
	};
	static FAILED_SAVE_DATA      = {
		'Status' : 'FAILED_SAVE_DATA',
		'Code'   : 2002,
	};
	static DATA_NOT_FOUND        = {
		'Status' : 'DATA_NOT_FOUND',
		'Code'   : 2003,
	};
	static FAILED_TO_VERIFY      = {
		'Status' : 'FAILED_TO_VERIFY',
		'Code'   : 2004,
	};
	static FAILED_TRACK_LOCATION = {
		'Status' : 'FAILED_TRACK_LOCATION',
		'Code'   : 2005,
	};
	static NO_DATA_FOUND         = {
		'Status' : 'NO_DATA_FOUND',
		'Code'   : 2006,
	};
	static DATA_EXIST            = {
		'Status' : 'DATA_EXIST',
		'Code'   : 2007,
	};
	static INVALID_DATA          = {
		'Status' : 'INVALID_DATA',
		'Code'   : 2008,
	};
	static FAILED_TO_REGISTER    = {
		'Status' : 'FAILED_TO_REGISTER',
		'Code'   : 2009,
	};
	static SESSION_EXPPIRED      = {
		'Status' : 'SESSION_EXPPIRED',
		'Code'   : 2010,
	};
	static INVALID_CREDENTIAL    = {
		'Status' : 'INVALID_CREDENTIAL',
		'Code'   : 2011,
	};
	static FORBIDDEN             = {
		'Status' : 'FORBIDDEN',
		'Code'   : 2012,
	};
	static FAILED_DELETE_DATA    = {
		'Status' : 'FAILED_DELETE_DATA',
		'Code'   : 2013,
	};
	static TOKEN_NOT_FOUND       = {
		'Status' : 'TOKEN_NOT_FOUND',
		'Code'   : 2014,
	};
	static SESSION_EXPIRED       = {
		'Status' : 'SESSION_EXPIRED',
		'Code'   : 2015,
	};
	static PAGE_NOT_FOUND        = {
		'Status' : 'PAGE_NOT_FOUND',
		'Code'   : 2016,
	};
}

export default ResponseCode;