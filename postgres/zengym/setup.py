from setuptools import find_packages, setup

setup(
  name='zengym',
  packages=find_packages(),
  version='0.0.0',
  description='Zengym AI tools for postgres',
  author='Pasquale Boemio <pasquale.boemio@statwolf.com>',
  install_requires=[
    'torch==2.6.0',
    'sentence-transformers==3.4.1'
  ],
  dependency_links=[
    'https://download.pytorch.org/whl/cpu'
  ]
)
