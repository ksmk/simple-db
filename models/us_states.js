/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('us_states', {
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    state_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state_abbr: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state_region: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'us_states'
  });
};
