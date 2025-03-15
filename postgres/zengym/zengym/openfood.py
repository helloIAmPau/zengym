from duckdb import sql
from csv import writer
from sys import stdout

OUTPUT_FILE = '/datasets/food.csv'
REMOTE_PARQUET_URI = 'https://huggingface.co/datasets/openfoodfacts/product-database/resolve/main/food.parquet'
BATCH_SIZE = 100000

def prepare_csv(limit=-1):
  limit_part = ''
  if limit > -1:
    limit_part = f'limit {limit}'

  csv = writer(OUTPUT_FILE)
  cursor = sql(f'select code, generic_name, product_name, brands, nutriments from \'{REMOTE_PARQUET_URI}\' {limit_part}')
  while batch := cursor.fetchmany(BATCH_SIZE):
    for row in batch:
      if row[4] == None:
        continue
  
      code = row[0]
      product_name = next((value['text'] for index, value in enumerate(row[2]) if value['lang'] == 'main'), '')
      brands = row[3] if row[3] != None else ''
      name = next((value['text'] for index, value in enumerate(row[1]) if value['lang'] == 'main'), f'{brands} {product_name}')
      nutriments = [ next((value['100g'] for index, value in enumerate(row[4]) if value['name'] == nutriment and value['100g'] != None), 0) for nutriment in [ 'alcohol', 'proteins', 'carbohydrates', 'fat', 'energy-kcal' ] ]
  
      csv.writerow([
        code,
        name,
        product_name,
        brands
      ] + nutriments)

if __name__ == '__main__':
  prepare_csv()
