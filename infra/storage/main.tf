provider "aws" {
  region = var.aws_region
}

resource "aws_dynamodb_table" "grasshopper_db_table" {
  name           = var.db_table_name
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "datetime"

  attribute {
    name = "datetime"
    type = "N"
  }

  tags = {
    Name = "grasshopper-dashboard"
  }
}
