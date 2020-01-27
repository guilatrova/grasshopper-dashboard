variable "aws_region" {
  type        = string
  description = "AWS region"
  default     = "us-east-1"
}

variable "db_table_name" {
  type        = string
  description = "DynamoDB Table Name"
  default     = "grasshopper_data"

}
