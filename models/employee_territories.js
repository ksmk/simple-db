/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee_territories', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'employees',
        key: 'employee_id'
      }
    },
    territory_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'territories',
        key: 'territory_id'
      }
    }
  }, {
    tableName: 'employee_territories'
  });
};
