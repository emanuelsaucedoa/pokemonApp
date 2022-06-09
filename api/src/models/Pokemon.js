const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida: {
      type: DataTypes.INTEGER
    },
    fuerza: {
      type: DataTypes.INTEGER
    },
    defensa: {
      type: DataTypes.INTEGER
    },
    velocidad: {
      type: DataTypes.INTEGER
    },
    altura: {
      type: DataTypes.DECIMAL
    },
    peso: {
      type: DataTypes.DECIMAL
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: "https://pa1.narvii.com/7332/2833e53fbe0004a749fee71a439d433642f3fcddr1-500-396_hq.gif"
      // https://pbs.twimg.com/media/DnZcRmKU0AA407g.jpg
      // http://pm1.narvii.com/6758/e759c0548be4131e4f3e17ca74da08af0cbd20f6v2_00.jpg
    }
  });
};
