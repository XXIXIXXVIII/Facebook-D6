import Vue from 'vue';
import { create } from '@amcharts/amcharts4/core';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

Vue.use(am4themesAnimated);

// Tạo biểu đồ mẫu
Vue.prototype.$createChart = function (containerId) {
  const chart = create(containerId);
  // Thêm cấu hình và xử lý biểu đồ tại đây
  return chart;
};
