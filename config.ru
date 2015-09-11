#!/usr/bin/env ruby
require "rack"
require 'chaplin'

run Chaplin.new(Dir.pwd + "/dist").server
