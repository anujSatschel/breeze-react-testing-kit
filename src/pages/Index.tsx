
import React from 'react';
import { Button } from '@/components/ui/button';
import Counter from '@/components/Counter/Counter';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">React Testing Kit</h1>
            <p className="text-xl text-gray-600">A starter template for React with Jest and React Testing Library</p>
            <div className="mt-4">
              <Button asChild>
                <Link to="/recoil">View Recoil Examples</Link>
              </Button>
            </div>
          </header>

          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Example Components</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-700 mb-3">Button Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-700 mb-3">Custom Button Component</h3>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700">Primary</Button>
                <Button className="bg-gray-200 text-gray-800 hover:bg-gray-300">Secondary</Button>
                <Button className="bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50">Outline</Button>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-700 mb-3">Counter Component</h3>
              <div className="flex justify-center">
                <Counter initialCount={0} min={-10} max={10} step={1} />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Testing Features</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Jest for test running and assertions</li>
              <li>React Testing Library for component testing</li>
              <li>User event simulation for interaction testing</li>
              <li>Jest DOM for additional DOM assertions</li>
              <li>TypeScript support with ts-jest</li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <pre className="text-sm text-gray-800 overflow-x-auto">
                <code>npm test</code>
              </pre>
            </div>
            <p className="text-gray-700">
              Run the command above to execute all tests using Jest. Write your tests in files with the pattern 
              <code className="bg-gray-100 px-1 mx-1 rounded-sm">*.test.tsx</code> or 
              <code className="bg-gray-100 px-1 mx-1 rounded-sm">*.spec.tsx</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
