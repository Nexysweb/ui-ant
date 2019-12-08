const colors = {
  danger: '#ff5500',
  default: '#d9d9d9',
  primary: '#4482FF',
  success: '#87d068',
  warning: '#faad14'
};

const colorFromCode = (c) => {
  switch (c) {
    case 'success':
      return colors.success;
    case 'warning':
      return colors.warning;
    case 'danger':
      return colors.danger;
    case 'primary':
      return colors.primary;
    default:
      return colors.default;
  }
}

const colorByStatus = (statusId) => {
  switch (statusId) {
    case 2:
      return 'warning';
    case 3:
      return 'danger';
    default:
      return 'success';
  }
}

const colorByStatusReverse = (statusId) => {
  switch (statusId) {
    case 2:
      return 'warning';
    case 1:
      return 'danger';
    default:
      return 'success';
  }
}

export default { colorFromCode, colorByStatus, colorByStatusReverse }