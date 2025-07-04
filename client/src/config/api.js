// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

// API Endpoints
export const ENDPOINTS = {
  // Auth
  AUTH: {
    ACCOUNT: '/api/auth/account',
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
  },
  
  // User
  USER: {
    GET_ALL: '/api/user/getAll',
    GET_ONE: (id) => `/api/user/getOne/${id}`,
    UPDATE: (id) => `/api/user/update/${id}`,
    DELETE: (id) => `/api/user/delete/${id}`,
    UPDATE_PASSWORD: (id) => `/api/user/password/${id}`,
    FORGOT_PASSWORD: '/api/user/forgot-password',
    RESET_PASSWORD: (id, token) => `/api/user/reset/${id}/${token}`,
  },

  // Student
  STUDENT: {
    INSERT: '/api/student/insert',
    UPDATE: (id) => `/api/student/update/${id}`,
    UPDATE_BY_STUDENT: (id) => `/api/student/updateByStud/${id}`,
    DELETE: (id) => `/api/student/delete/${id}`,
    DELETE_ALL: '/api/student/deleteAll',
    GET_ALL: '/api/student/get',
    GET_ONE: (id) => `/api/student/getOne/${id}`,
    UPDATE_PASSWORD: (id) => `/api/student/updatePassword/${id}`,
    GET_FOR_PROCTOR: (id) => `/api/student/getForProctor/${id}`,
  },

  // Maintenance
  MAINTENANCE: {
    ADD: '/api/maintainanceIssue/add',
    GET_BY_GENDER: (gender) => `/api/maintainanceIssue/get/${gender}`,
    GET_ALL: '/api/maintainanceIssue/getAll',
    GET_WHOLE: '/api/maintainanceIssue/getWhole',
    GET_BY_STATUS: (gender, status) => `/api/maintainanceIssue/getByStatus/${gender}/${status}`,
    GET_BY_STATUS_FOR_DEAN: (status) => `/api/maintainanceIssue/getByStatusForDean/${status}`,
    GET_PENDING_STATUS: (status, id) => `/api/maintainanceIssue/getPendingStatus/${status}/${id}`,
    GET_ONE: (id, model) => `/api/maintainanceIssue/getOne/${id}/${model}`,
    VERIFY: '/api/maintainanceIssue/verify',
  },

  // Feedback
  FEEDBACK: {
    ADD: '/api/feedBack/add',
    GET_BY_SEX: (sex) => `/api/feedBack/get/${sex}`,
    GET_FOR_STUDENT: (id) => `/api/feedBack/getForStud/${id}`,
    GET_ALL: '/api/feedBack/getAll',
  },

  // Dorm
  DORM: {
    GET_FLOOR_DORMS: (blockId, floorNumber) => `/api/dorm/${blockId}/floors/${floorNumber}/dorms`,
    UPDATE_STATUS: (blockId, floorNumber, dormNumber) => 
      `/api/dorm/${blockId}/floors/${floorNumber}/dorms/${dormNumber}/status`,
    GET_ISSUE_DORMS: '/api/dorm/getIssueDorms',
    GET_STATISTICS: '/api/dorm/statistics',
  },

  // Control
  CONTROL: {
    ADD: '/api/control/add',
    GET: '/api/control/get',
    UPDATE: '/api/control/update',
  },

  // Recent Users
  RECENT_USER: {
    SEARCH_STUDENT: (role, id) => `/api/recentuser/SearchStudent/${role}/${id}`,
    ADD: '/api/recentuser/add',
  },

  // Block
  BLOCK: {
    REGISTER: '/api/block/register',
    GET_AVAILABLE: '/api/block/getAvailabeBlock',
    GET_ALL: '/api/block/getAll',
    GET_MY_BLOCK: '/api/block/proctor/my-block',
    GET_AVAILABLE_PROCTORS: '/api/block/proctors/available',
    UPDATE: '/api/block/update',
  },

  // Attendance
  ATTENDANCE: {
    ADD: '/api/attendance/add',
    GET_ABSENT: '/api/attendance/getAbsent',
  },

  // Chat
  CHAT: {
    ROOM: '/api/chat/room',
    MESSAGE: '/api/chat/message',
    GET_MESSAGE: (messageId) => `/api/chat/messages/${messageId}`,
    GET_MESSAGES: (receiverId) => `/api/chat/messages/${receiverId}`,
    MARK_READ: '/api/chat/messages/mark-read',
    UNREAD_COUNT: (userId) => `/api/chat/messages/unread-count/${userId}`,
  },

  // Backup
  BACKUP: {
    GET: '/api/backup',
    CREATE: '/api/backup',
    DELETE: (filename) => `/api/backup/${filename}`,
    DOWNLOAD: (filename) => `/api/backup/download/${filename}`,
    RESTORE: (filename) => `/api/backup/restore/${filename}`,
  },
};

// API Helper function to construct full URLs
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`; 