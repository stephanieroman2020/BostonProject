import pandas as pd
import sqlite3
import sqlalchemy

# load data
noise_df = pd.read_csv('Noise_LatLong.csv')
rodent_df=pd.read_csv('RodentPests_LatLong.csv')
trash_df=pd.read_csv('Trash_LatLong.csv')

# strip whitespace from headers/rename columns
noise_df.columns = noise_df.columns.str.strip()
noise_df.columns=['key', 'type', 'latitude','longitude']

rodent_df.columns = rodent_df.columns.str.strip()
rodent_df.columns=['key', 'type', 'latitude','longitude']

trash_df.columns = trash_df.columns.str.strip()
trash_df.columns=['key', 'type', 'latitude','longitude']

connection = sqlite3.connect("boston.db")

# create tables/drop data into database
noise_df.to_sql("NoiseTable", connection)
rodent_df.to_sql("RodentTable", connection)
trash_df.to_sql("TrashTable", connection)


df1 = pd.read_sql_query("select * from NoiseTable limit 5;", connection)
df2 = pd.read_sql_query("select * from RodentTable limit 5;", connection)
df3 = pd.read_sql_query("select * from TrashTable limit 5;", connection)



print(df1.to_json())
print(df2)
print(df3)


connection.close()