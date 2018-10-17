/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shippers', {
    shipper_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    object_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: sequelize.fn('uuid_generate_v4')
    }
  }, {
    tableName: 'shippers'
  });
};
