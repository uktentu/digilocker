import axios from 'axios';
import AuthService from './AuthService';

const API_URL = '/api/documents/';

class DocumentService {
  getAllDocuments() {
    return axios.get(API_URL, { headers: AuthService.getAuthHeader() });
  }

  getDocumentById(id) {
    return axios.get(API_URL + id, { headers: AuthService.getAuthHeader() });
  }

  createDocument(document) {
    return axios.post(API_URL, document, { headers: AuthService.getAuthHeader() });
  }

  updateDocument(id, document) {
    return axios.put(API_URL + id, document, { headers: AuthService.getAuthHeader() });
  }

  deleteDocument(id) {
    return axios.delete(API_URL + id, { headers: AuthService.getAuthHeader() });
  }

  verifyDocument(id) {
    return axios.put(API_URL + id + '/verify', {}, { headers: AuthService.getAuthHeader() });
  }

  searchDocuments(name) {
    return axios.get(API_URL + 'search', {
      params: { name },
      headers: AuthService.getAuthHeader()
    });
  }
}

export default new DocumentService();