import apiClient from './apiClient';

const emailService = {
  async forgot(email: string) {
    const res = await apiClient.post('/password/forgot', { email });
    return res.data;
  },

  async reset(token: string, password: string) {
    const res = await apiClient.post('/password/reset', { token, password });
    return res.data;
  }
};

export default emailService;
