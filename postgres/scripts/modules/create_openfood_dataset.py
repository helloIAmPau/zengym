from duckdb import sql
from csv import writer

OUTPUT_FILE = '/datasets/food.csv'
REMOTE_PARQUET_URI = 'https://huggingface.co/datasets/openfoodfacts/product-database/resolve/main/food.parquet'
BATCH_SIZE = 1000

def run(limit=-1):
  print('Starting')
  limit_part = ''
  if limit > -1:
    limit_part = f'limit {limit}'

  with open(OUTPUT_FILE, 'w') as file:
    csv = writer(file)
    cursor = sql(f'select code, generic_name, product_name, brands, nutriments from \'{REMOTE_PARQUET_URI}\' {limit_part}')
    while batch := cursor.fetchmany(BATCH_SIZE):
      print('Parsing...')
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
          brands,
        ] + nutriments)

    print('Done!')

if __name__ == '__main__':
  run()
