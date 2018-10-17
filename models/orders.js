/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.CHAR,
      allowNull: true,
      references: {
        model: 'customers',
        key: 'customer_id'
      }
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'employee_id'
      }
    },
    order_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    required_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    shipped_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ship_via: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'shippers',
        key: 'shipper_id'
      }
    },
    freight: {
      type: DataTypes.REAL,
      allowNull: true
    },
    ship_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ship_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ship_city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ship_region: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ship_postal_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ship_country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    object_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: sequelize.fn('uuid_generate_v4')
    }
  }, {
    tableName: 'orders'
  });
};
